import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
// import { deduplicatedRefresh } from "./token-cache"
import { getExpiryFromToken } from "./jwt-utils"
import { refreshAccessToken } from "./refresh-token"
import { deduplicatedRefresh } from "./refresh-lock"

const REFRESH_BUFFER_MS = 10_000

class InvalidLoginError extends CredentialsSignin {
    code = "401"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,

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
                )

                if (!res.ok) throw new InvalidLoginError()

                const data = await res.json()
                const now = Date.now()
                const accessToken = data.data.access_token
                const expMs = getExpiryFromToken(accessToken)
                if (!expMs) throw new Error("Invalid token")

                const rawRefreshExp = Number(data.data.refresh_expires_in)
                const refreshExpiresAt = rawRefreshExp > 1e12
                    ? rawRefreshExp
                    : now + rawRefreshExp * 1000

                return {
                    id: data.data.user.id,
                    username: data.data.user.username,
                    accessToken,
                    refreshToken: data.data.refresh_token,
                    tokenType: data.data.token_type,
                    expiresIn: expMs,
                    refreshExpiresIn: refreshExpiresAt,
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
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
            const expiresAt = token.expiresIn as number | undefined

            if (expiresAt && now < expiresAt - REFRESH_BUFFER_MS) {
                return token
            }

            const isRefreshValid =
                token.refreshExpiresIn && now < token.refreshExpiresIn

            if (!isRefreshValid || !token.refreshToken) {
                return { ...token, error: "RefreshTokenExpiredError" }
            }

            try {
                const sessionKey = String(token.id ?? token.username)
                const refreshed = await deduplicatedRefresh(
                    sessionKey,
                    token.refreshToken,
                    refreshAccessToken
                )
                const newExpMs = getExpiryFromToken(refreshed.accessToken)
                if (!newExpMs) throw new Error("Invalid refreshed token")

                const now = Date.now()
                const refreshExpiresAt = refreshed.refreshExpiresIn > 1e12
                    ? refreshed.refreshExpiresIn
                    : now + Number(refreshed.refreshExpiresIn) * 1000

                return {
                    ...token,
                    accessToken: refreshed.accessToken,
                    refreshToken: refreshed.refreshToken,
                    tokenType: refreshed.tokenType,
                    expiresIn: newExpMs,
                    refreshExpiresIn: refreshExpiresAt,
                    error: undefined,
                }
            } catch (error) {
                console.log("RefreshTokenError: ", error)
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
            session.expiresIn = token.expiresIn

            return session
        },
    },
})