// middleware.ts
import { NextResponse } from "next/server"
import { auth } from "./app/lib/auth"

// Define which paths require authentication
const protectedPaths = ["/my", "/my/requests", "/new-request"]
const authPaths = ["/auth"]

export async function proxy(request: Request) {
    // Get the session using auth() (v5 approach)
    const session = await auth()
    const isLoggedIn = !!session?.user
    const { pathname } = new URL(request.url)

    // Check if the current path is a protected route
    const isProtectedRoute = protectedPaths.some(path =>
        pathname.startsWith(path)
    )

    // Check if the current path is an auth route
    const isAuthRoute = authPaths.some(path =>
        pathname.startsWith(path)
    )

    // If logged in and trying to access auth pages, redirect to home
    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    // If not logged in and trying to access protected pages, redirect to login
    if (!isLoggedIn && isProtectedRoute) {
        const loginUrl = new URL("/api/auth/signin", request.url)
        // Optional: Add callback URL so user returns after login
        loginUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}