// lib/axios.ts
"use client"

import axios from "axios"
import { getSession } from "next-auth/react"
// Create a base Axios instance
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Add a request interceptor to attach the token
axiosClient.interceptors.request.use(
    async (config) => {
        const session = await getSession()

        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session?.accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor for automatic token refresh
// axiosClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config

//         // If the error is 401 and we haven't already tried to refresh
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true

//             try {
//                 // Get current session to access refresh token
//                 const session = await auth()

//                 if (!session?.refreshToken) {
//                     throw new Error("No refresh token available")
//                 }

//                 // Refresh the token
//                 const refreshRes = await refresh(session.refreshToken)

//                 // Update the session with new tokens
//                 await updateSession({
//                     accessToken: refreshRes.access_token,
//                     refreshToken: refreshRes.refresh_token,
//                     expiresIn: Date.now() + (refreshRes.expires_in * 1000),
//                     refreshExpiresIn: Date.now() + (refreshRes.refresh_expires_in * 1000),
//                     tokenType: refreshRes.token_type,
//                 })

//                 // Update the authorization header and retry
//                 originalRequest.headers.Authorization = `Bearer ${refreshRes.access_token}`
//                 return axiosClient(originalRequest)

//             } catch (refreshError) {
//                 console.error("Token refresh failed:", refreshError)
//                 // You might want to sign out here
//                 // await signOut({ redirect: true, redirectTo: "/auth?form=login" })
//                 return Promise.reject(refreshError)
//             }
//         }

//         return Promise.reject(error)
//     }
// )

export default axiosClient