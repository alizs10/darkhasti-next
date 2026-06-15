import { headers } from "next/headers"

interface RefreshResponse {
    accessToken: string
    tokenType?: string
    expiresIn?: number
    error?: string
}

let refreshPromise: Promise<RefreshResponse | null> | null = null

function getBaseUrl() {
    if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return "http://localhost:3000"
}

export async function getFreshAccessTokenServer(): Promise<RefreshResponse | null> {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const h = await headers()
            const res = await fetch(`${getBaseUrl()}/api/auth/refresh`, {
                method: "POST",
                headers: { cookie: h.get("cookie") ?? "" },
            })

            if (!res.ok) return null
            return res.json()
        })().finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}
