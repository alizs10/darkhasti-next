"use client"

import axios from "axios"
import { getSession, signOut } from "next-auth/react"

interface RefreshResponse {
    accessToken: string
    error?: string
}

let refreshPromise: Promise<RefreshResponse | null> | null = null

async function getFreshAccessToken(): Promise<RefreshResponse | null> {
    if (!refreshPromise) {
        refreshPromise = fetch("/api/auth/refresh", { method: "POST" })
            .then(async (res) => {
                if (!res.ok) return null
                return res.json()
            })
            .finally(() => {
                refreshPromise = null
            })
    }

    return refreshPromise
}

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
})

axiosClient.interceptors.request.use(
    async (config) => {
        if (config.headers.Authorization) return config

        const session = await getSession()

        if (
            session?.error === "RefreshTokenExpiredError" ||
            session?.error === "RefreshTokenError"
        ) {
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

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshed = await getFreshAccessToken()

                if (refreshed?.error || !refreshed?.accessToken) {
                    await signOut({ redirectTo: "/auth?form=login" })
                    return Promise.reject(error)
                }

                originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`
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
