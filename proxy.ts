// proxy.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decode, encode } from "next-auth/jwt"
import { deduplicatedRefresh } from "./app/lib/token-cache"
import { refresh } from "./app/actions/auth"

const protectedPaths = ["/my", "/my/requests", "/new-request"]
const authPaths = ["/auth"]

const SECRET = process.env.NEXTAUTH_SECRET!
const SESSION_COOKIE =
    process.env.SESSION_TOKEN_NAME ||
    (process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token")

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))
    const isAuthRoute = authPaths.some(path => pathname.startsWith(path))

    if (!SECRET) return signOut(request)

    // Decode the JWT directly from the cookie — no NextAuth overhead
    const token = await decode({
        token: request.cookies.get(SESSION_COOKIE)?.value,
        secret: SECRET,
        salt: SESSION_COOKIE,
    })

    let response = NextResponse.next()

    if (isProtectedRoute) {
        if (!token) return signOut(request)

        if (shouldSignOut(token)) return signOut(request)

        if (shouldUpdateToken(token)) {
            try {
                const refreshed = await deduplicatedRefresh(
                    token.refreshToken as string,
                    refresh
                )

                const newToken = await encode({
                    token: {
                        ...token,
                        accessToken: refreshed.accessToken,
                        refreshToken: refreshed.refreshToken,
                        tokenType: refreshed.tokenType,
                        expiresIn: Date.now() + refreshed.expiresIn * 1000,
                        refreshExpiresIn: Date.now() + refreshed.refreshExpiresIn * 1000,
                    },
                    secret: SECRET,
                    salt: SESSION_COOKIE,
                })

                response = updateCookie(newToken, request, response)

            } catch {
                return signOut(request)
            }
        }
    }

    // Redirect logged-in users away from auth pages
    if (isAuthRoute && token && !shouldSignOut(token)) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return response
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function signOut(request: NextRequest) {
    const response = NextResponse.redirect(new URL("/auth?form=login", request.url))
    response.cookies.delete(SESSION_COOKIE)
    return response
}

function shouldSignOut(token: any): boolean {
    if (!token) return true

    const now = Date.now()
    const accessExpired = !token.expiresIn || now > Number(token.expiresIn)
    const refreshExpired = !token.refreshExpiresIn || now > Number(token.refreshExpiresIn)

    // Sign out only if BOTH tokens are expired
    return accessExpired && refreshExpired
}

function shouldUpdateToken(token: any): boolean {
    if (!token?.expiresIn) return true
    // Access token is expired — needs refresh
    return Date.now() > Number(token.expiresIn)
}

function updateCookie(
    newToken: string,
    request: NextRequest,
    response: NextResponse
): NextResponse {
    // Update the cookie on the request so the current render sees the new token
    request.cookies.set(SESSION_COOKIE, newToken)

    response = NextResponse.next({
        request: { headers: request.headers },
    })

    // Set the cookie on the response so the browser stores the new token
    response.cookies.set(SESSION_COOKIE, newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    })

    return response
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}