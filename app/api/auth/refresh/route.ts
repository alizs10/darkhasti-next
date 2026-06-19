import { NextResponse } from "next/server"
import { auth } from "@/app/lib/auth"
import { deduplicatedRefresh } from "@/app/lib/refresh-lock"
import { refreshAccessToken } from "@/app/lib/refresh-token"
import { getExpiryFromToken } from "@/app/lib/jwt-utils"

export async function POST() {
    try {
        // 1. Get the current session (reads the NextAuth cookie)
        const session = await auth()

        if (!session || !session.user?.id || !session.refreshToken) {
            return NextResponse.json({ error: "No active session" }, { status: 401 })
        }

        const sessionKey = String(session.user.id)
        const oldRefreshToken = session.refreshToken as string

        // 2. Use the Redis lock to prevent race conditions
        const refreshed = await deduplicatedRefresh(
            sessionKey,
            oldRefreshToken,
            refreshAccessToken
        )

        const newExpMs = getExpiryFromToken(refreshed.accessToken)
        if (!newExpMs) throw new Error("Invalid refreshed token")

        // 3. Return the new tokens to the client
        return NextResponse.json({
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken,
            expiresIn: newExpMs,
            refreshExpiresIn: Date.now() + (refreshed.refresh_expires_in * 1000)
        })
    } catch (error) {
        console.error("API Refresh Error:", error)
        return NextResponse.json({ error: "Refresh failed" }, { status: 401 })
    }
}