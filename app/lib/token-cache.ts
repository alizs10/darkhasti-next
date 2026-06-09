// lib/token-cache.ts

interface CachedToken {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
    refreshExpiresIn: number
}

// In-flight refresh promises keyed by the OLD refresh token
const inflightMap = new Map<string, Promise<CachedToken>>()

// Completed refresh results keyed by the OLD refresh token
// Kept briefly so concurrent requests that arrive late can reuse the result
// without hitting the backend again
const resultCache = new Map<string, { value: CachedToken; expiresAt: number }>()

const RESULT_TTL_MS = 10_000 // keep result for 10 seconds — enough for concurrent requests to reuse it

export async function deduplicatedRefresh(
    oldRefreshToken: string,
    refreshFn: (token: string) => Promise<any>
): Promise<CachedToken> {
    console.log("🔍 called with token ending:", oldRefreshToken.slice(-10), "| cache size:", resultCache.size, "| cache keys:", [...resultCache.keys()].map(k => k.slice(-10)))

    // 1. Check if we already have a recent result for this token
    const cached = resultCache.get(oldRefreshToken)
    if (cached && Date.now() < cached.expiresAt) {

        console.log(cached)


        console.log("⚡ Reusing cached refresh result")
        return cached.value
    }

    // 2. Check if a refresh is already in-flight for this token
    const existing = inflightMap.get(oldRefreshToken)
    if (existing) {
        console.log("⏳ Piggybacking on existing refresh...")
        return existing
    }

    // 3. Start a new refresh
    const promise = refreshFn(oldRefreshToken)
        .then((data) => {

            console.log("new access token:", data.access_token)
            const result: CachedToken = {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                tokenType: data.token_type,
                expiresIn: data.expires_in,
                refreshExpiresIn: data.refresh_expires_in,
            }

            // Cache the result so late-arriving concurrent requests reuse it
            resultCache.set(oldRefreshToken, {
                value: result,
                expiresAt: Date.now() + RESULT_TTL_MS,
            })

            return result
        })
        .finally(() => {
            inflightMap.delete(oldRefreshToken)
        })

    inflightMap.set(oldRefreshToken, promise)
    return promise
}