import type { TokenData } from "./refresh-token"

interface CachedToken {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
    refreshExpiresIn: number
}

const refreshMap = new Map<string, Promise<CachedToken>>()

export async function deduplicatedRefresh(
    sessionKey: string,
    oldRefreshToken: string,
    refreshFn: (token: string) => Promise<TokenData>
): Promise<CachedToken> {
    const existing = refreshMap.get(sessionKey)
    if (existing) {
        return existing
    }

    const promise = refreshFn(oldRefreshToken)
        .then((data) => ({
            accessToken: data.access_token,
            refreshToken: data.refresh_token ?? oldRefreshToken,
            tokenType: data.token_type,
            expiresIn: data.expires_in,
            refreshExpiresIn: data.refresh_expires_in,
        }))
        .finally(() => {
            refreshMap.delete(sessionKey)
        })

    refreshMap.set(sessionKey, promise)
    return promise
}
