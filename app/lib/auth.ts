// lib/auth.ts
import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { refresh } from "../actions/auth"
import { deduplicatedRefresh } from "./token-cache"

class InvalidLoginError extends CredentialsSignin {
    code = "401";
}

export const authConfig: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
        updateAge: 0, // ← add this
    },

    pages: {
        signIn: "/auth?form=login",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "text" },
            },

            async authorize(credentials) {
                const res = await fetch(
                    `${process.env.BACKEND_API_URL}/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    }
                );

                console.log(res)

                if (!res.ok) {

                    console.log("are we in here")

                    throw new InvalidLoginError();
                }

                const data = await res.json();
                const now = Date.now()

                return {
                    id: data.data.user.id,
                    username: data.data.user.username,
                    accessToken: data.data.access_token,
                    refreshToken: data.data.refresh_token,
                    tokenType: data.data.token_type,
                    expiresIn: now + (Number(data.data.expires_in) * 1000),
                    refreshExpiresIn: now + (Number(data.data.refresh_expires_in) * 1000),
                };
            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // ── 1. Initial sign-in ────────────────────────────────────────────
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    tokenType: user.tokenType,
                    expiresIn: user.expiresIn,
                    refreshExpiresIn: user.refreshExpiresIn,
                }
            }

            const now = Date.now()
            console.log("is access valid: ", typeof token.expiresIn, token.expiresIn)
            const isAccessValid = token.expiresIn && now < token.expiresIn


            console.log({ isAccessValid })


            // ── 2. Access token still valid ───────────────────────────────────
            if (isAccessValid) return token

            // ── 3. Check refresh token validity ───────────────────────────────
            const isRefreshValid =
                token.refreshExpiresIn &&
                now < token.refreshExpiresIn

            if (!isRefreshValid || !token.refreshToken) {
                return { ...token, error: "RefreshTokenExpiredError" }
            }

            // ── 4. Refresh — deduplicated across concurrent requests ───────────
            // Key: the refresh token string itself. Two requests carrying the
            // same (not-yet-rotated) refresh token will share one HTTP call.
            try {

                const refreshed = await deduplicatedRefresh(token.refreshToken, refresh)



                return {
                    ...token,
                    accessToken: refreshed.accessToken,
                    refreshToken: refreshed.refreshToken,
                    tokenType: refreshed.tokenType,
                    expiresIn: Date.now() + (Number(refreshed.expiresIn) * 1000),
                    refreshExpiresIn: Date.now() + (Number(refreshed.refreshExpiresIn) * 1000),
                    error: undefined,
                }
            } catch (err) {
                console.error("Token refresh failed:", err)
                return { ...token, error: "RefreshTokenError" }
            }
        },

        async session({ session, token }) {
            if (token.error) {
                return {
                    ...session,
                    user: undefined,
                    accessToken: undefined,
                    error: token.error,
                }
            }

            session.user = {
                ...session.user,
                id: token.id as string,
                username: token.username as string,
            }

            session.accessToken = token.accessToken
            session.tokenType = token.tokenType

            return session
        },
    },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)