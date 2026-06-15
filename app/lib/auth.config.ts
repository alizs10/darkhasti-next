import type { NextAuthConfig } from "next-auth"

export const authConfig: Partial<NextAuthConfig> = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt", updateAge: 0 },
    pages: { signIn: "/auth?form=login" },
}
