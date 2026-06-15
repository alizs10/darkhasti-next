import { auth } from "@/app/lib/auth"
import { NextResponse } from "next/server"

export async function POST() {
    const session = await auth()

    if (session?.error) {
        return NextResponse.json({ error: session.error }, { status: 401 })
    }

    if (!session?.accessToken) {
        return NextResponse.json({ error: "NoSession" }, { status: 401 })
    }

    return NextResponse.json({
        accessToken: session.accessToken,
        tokenType: session.tokenType,
        expiresIn: session.expiresIn,
    })
}
