import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/app/lib/auth"

const protectedPaths = ["/my", "/my/requests", "/new-request"]
const authPaths = ["/auth"]

const SESSION_COOKIE =
    process.env.SESSION_TOKEN_NAME ||
    (process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token")

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path))
    const isAuthRoute = authPaths.some((path) => pathname.startsWith(path))

    const session = await auth()

    if (isProtectedRoute) {
        if (!session || session.error) {
            return signOut(request)
        }
    }

    if (isAuthRoute && session && !session.error) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

function signOut(request: NextRequest) {
    const response = NextResponse.redirect(new URL("/auth?form=login", request.url))
    response.cookies.delete(SESSION_COOKIE)
    return response
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
