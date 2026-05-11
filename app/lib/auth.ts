// auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/app/lib/axios";   // adjust path as needed

export const { handlers, auth, signIn, signOut } = NextAuth({
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
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    const res = await axios.post("/login", {
                        username: credentials.username,
                        password: credentials.password,
                    });

                    const data = res.data;

                    if (res.status === 200 && data?.user) {
                        return {
                            id: data.user.id?.toString(),
                            username: data.user.username,
                            access_token: data.access_token,
                        };
                    }
                } catch (error) {
                    console.error("Auth error:", error);
                }
                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.access_token = user.access_token;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                (session as any).access_token = token.access_token; // or extend Session type
            }
            return session;
        },
    },
});