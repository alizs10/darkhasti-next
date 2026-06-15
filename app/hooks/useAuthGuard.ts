"use client"

import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

export function useAuthGuard() {
    const { data: session } = useSession()

    useEffect(() => {
        const tokenErrors = [
            "RefreshTokenExpiredError",
            "RefreshTokenError",
            "TokenExpiredError",
        ]

        if (session?.error && tokenErrors.includes(session.error as string)) {
            signOut({ redirectTo: "/auth?form=login" })
        }
    }, [session?.error])
}
