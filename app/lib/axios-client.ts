"use client"

import axios from "axios"
import { getSession, signOut } from "next-auth/react"

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
})

axiosClient.interceptors.request.use(
    async (config) => {
        if (config.headers.Authorization) return config

        const session = await getSession()

        console.log("axios client session: ", session)

        // ❌ hard invalid session → logout
        if (
            session?.error === "RefreshTokenExpiredError" ||
            session?.error === "RefreshTokenError"
        ) {

            console.log("axios client errors happened: ", "RefreshTokenExpiredError", "RefreshTokenError")

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

export default axiosClient