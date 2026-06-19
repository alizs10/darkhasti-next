// proxy.ts
import { auth } from "@/app/lib/auth"
import { NextResponse } from "next/server"

const protectedPaths = ["/my", "/my/requests", "/new-request"]
const authPaths = ["/auth"]

export const proxy = auth((req) => {
    const { pathname } = req.nextUrl
    const session = req.auth // already refreshed-and-persisted by the wrapper

    const isProtectedRoute = protectedPaths.some(p => pathname.startsWith(p))
    const isAuthRoute = authPaths.some(p => pathname.startsWith(p))

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/auth?form=login", req.url))
    }

    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}