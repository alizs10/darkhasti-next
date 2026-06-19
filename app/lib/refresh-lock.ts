import { redis } from "@/app/lib/redis"
import type { TokenData } from "./refresh-token"
import { getExpiryFromToken } from "./jwt-utils"

interface CachedToken {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
    refreshExpiresIn: number
}

const LOCK_TTL = 15_000
const RESULT_TTL = 30_000
const STALE_BUFFER_MS = 15_000
const MAX_POLL_ATTEMPTS = 40
const POLL_INTERVAL_MS = 250

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms))
}

function isTokenUsable(token: CachedToken): boolean {
    const exp = getExpiryFromToken(token.accessToken)
    if (!exp) return false
    return Date.now() < exp - STALE_BUFFER_MS
}

export async function deduplicatedRefresh(
    sessionKey: string,
    oldRefreshToken: string,
    refreshFn: (token: string) => Promise<TokenData>
): Promise<CachedToken> {

    const lockKey = `auth:refresh:lock:${sessionKey}`
    const resultKey = `auth:refresh:result:${sessionKey}`

    const cached = await redis.get(resultKey)
    if (cached) {
        const parsed: CachedToken = JSON.parse(cached)
        if (isTokenUsable(parsed)) return parsed
    }

    const lockAcquired = await redis.set(
        lockKey,
        "1",
        "PX",
        LOCK_TTL,
        "NX"
    )

    if (!lockAcquired) {
        for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
            const res = await redis.get(resultKey)
            if (res) {
                const parsed: CachedToken = JSON.parse(res)
                if (isTokenUsable(parsed)) return parsed
            }
            await sleep(POLL_INTERVAL_MS)
        }

        await redis.del(lockKey)
    }

    const data = await refreshFn(oldRefreshToken)

    const transformed: CachedToken = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? oldRefreshToken,
        tokenType: data.token_type,
        expiresIn: data.expires_in,
        refreshExpiresIn: data.refresh_expires_in,
    }

    await redis.set(
        resultKey,
        JSON.stringify(transformed),
        "PX",
        RESULT_TTL
    )

    return transformed
}