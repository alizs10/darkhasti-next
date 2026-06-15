"use client"

import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import TokenRefresher from "../layout/TokenRefresher"
import { useAuthGuard } from "@/app/hooks/useAuthGuard"

function AuthGuard() {
    useAuthGuard()
    return null
}

export default function AuthProvider({
    children,
    session,
}: {
    children: React.ReactNode
    session: Session | null
}) {
    return (
        <SessionProvider session={session}>
            <AuthGuard />
            {session?.expiresIn && !session.error && (
                <TokenRefresher expiresIn={session.expiresIn} />
            )}
            {children}
        </SessionProvider>
    )
}
