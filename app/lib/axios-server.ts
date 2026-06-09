// lib/axios-server.ts
"use server"

import axios from "axios"
import { auth } from "@/app/lib/auth"

const axiosServer = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosServer.interceptors.request.use(
    async (config) => {
        // If caller already set Authorization, skip — avoids redundant auth() call
        if (config.headers.Authorization) return config

        const session = await auth()

        // Session has a token error — don't attach a bad token
        if (session?.error) return config

        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// On 401 from the server side, the token in the cookie may be stale
// for this render (race between proxy write and RSC read).
// We don't retry on the server — proxy.ts will have already updated
// the cookie, so the next client navigation will be fine.
axiosServer.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("axiosServer 401 — token may be mid-rotation, proxy.ts will fix on next request")
        }
        return Promise.reject(error)
    }
)

export default axiosServer