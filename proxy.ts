// proxy.ts
import { auth } from "@/app/lib/auth"
import { NextResponse } from "next/server"

const protectedPaths = ["/my", "/my/requests", "/new-request"]
const authPaths = ["/auth"]

export const proxy = auth((req) => {
    const { pathname, search } = req.nextUrl
    const session = req.auth

    const isProtectedRoute = protectedPaths.some(p => pathname.startsWith(p))
    const isAuthRoute = authPaths.some(p => pathname.startsWith(p))

    if (isProtectedRoute && !session) {
        // Build the redirect URL with back_url
        const loginUrl = new URL("/auth", req.url)
        loginUrl.searchParams.set("form", "login")
        // Preserve the original path and its query string
        const originalUrl = pathname + search
        loginUrl.searchParams.set("back_url", originalUrl)

        return NextResponse.redirect(loginUrl)
    }

    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}