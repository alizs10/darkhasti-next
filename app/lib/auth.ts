// lib/auth.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth?form=login",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "text",
                },
            },

            async authorize(credentials) {
                const res = await fetch(
                    `${process.env.BACKEND_API_URL}/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Login failed"
                    );
                }

                return {
                    id: data.data.user.id,
                    username: data.data.user.username,
                    accessToken: data.data.access_token,
                    tokenType: data.data.token_type,
                    expiresIn: Date.now() + data.data.expires_in * 1000,
                };
            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // Initial login
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    accessToken: user.accessToken,
                    tokenType: user.tokenType,
                    expiresIn: user.expiresIn,
                }
            }

            // Check if access token is expired
            const now = Date.now()
            const isAccessValid = token.expiresIn && now < Number(token.expiresIn)

            // If access token is expired, sign out the user
            if (!isAccessValid) {
                return {
                    ...token,
                    error: "TokenExpiredError",
                }
            }

            return token
        },

        async session({ session, token }) {
            if (token.error === "TokenExpiredError") {
                await signOut({ redirect: false })

                return {
                    ...session,
                    user: undefined,
                    accessToken: undefined,
                    error: "TokenExpiredError",
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

// Export auth function and handlers using the config
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)