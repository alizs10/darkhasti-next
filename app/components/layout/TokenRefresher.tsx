"use client"

import { useEffect } from "react"

const REFRESH_BUFFER_MS = 60_000

export default function TokenRefresher({ expiresIn }: { expiresIn: number }) {
    useEffect(() => {
        const delay = expiresIn - Date.now() - REFRESH_BUFFER_MS

        const refresh = () => {
            fetch("/api/auth/refresh", { method: "POST" }).catch(() => {})
        }

        if (delay <= 0) {
            refresh()
            return
        }

        const timeout = setTimeout(refresh, delay)
        return () => clearTimeout(timeout)
    }, [expiresIn])

    return null
}
