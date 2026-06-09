// hooks/useAuthGuard.ts
"use client"

import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

/**
 * Drop this hook into your root layout (or any persistent client component).
 * It watches for token errors propagated from the JWT callback and signs the
 * user out automatically — redirecting them to the login page.
 */
export function useAuthGuard() {
    const { data: session } = useSession()

    useEffect(() => {
        const tokenErrors = [
            "RefreshTokenExpiredError",
            "RefreshTokenError",
            "TokenExpiredError",
        ]

        if (session?.error && tokenErrors.includes(session.error as string)) {
            console.warn("Session token error — signing out:", session.error)
            signOut({ redirectTo: "/auth?form=login" })
        }
    }, [session?.error])
}