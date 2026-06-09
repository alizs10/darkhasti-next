// lib/axios-client.ts
"use client"

import axios from "axios"
import { getSession, signOut } from "next-auth/react"

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Attach token from session on every request
axiosClient.interceptors.request.use(
    async (config) => {
        if (config.headers.Authorization) return config

        const session = await getSession()

        if (session?.error === "RefreshTokenExpiredError" || session?.error === "RefreshTokenError") {
            await signOut({ redirectTo: "/auth?form=login" })
            return Promise.reject(new Error("Session expired"))
        }

        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// On 401, the access token may have expired mid-session on the client.
// Hitting /api/auth/session triggers a new request through proxy.ts,
// which refreshes and updates the cookie, then we retry with the new token.
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // This request goes through proxy.ts which will refresh
                // the cookie if the token is expired
                const res = await fetch("/api/auth/session")
                const session = await res.json()

                if (session?.error || !session?.accessToken) {
                    await signOut({ redirectTo: "/auth?form=login" })
                    return Promise.reject(error)
                }

                originalRequest.headers.Authorization = `Bearer ${session.accessToken}`
                return axiosClient(originalRequest)

            } catch {
                await signOut({ redirectTo: "/auth?form=login" })
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosClient