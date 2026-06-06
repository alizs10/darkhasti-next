// lib/axios-server.ts
"use server"

import axios from "axios"
import { auth } from "@/app/lib/auth"

// Create a base Axios instance
const axiosServer = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Add a request interceptor to attach the token
axiosServer.interceptors.request.use(
    async (config) => {
        const session = await auth()

        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session?.accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosServer