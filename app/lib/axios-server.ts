import axios from "axios"
import { auth } from "@/app/lib/auth"
import { getFreshAccessTokenServer } from "@/app/lib/session-refresh"

const axiosServer = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
})

axiosServer.interceptors.request.use(
    async (config) => {
        if (config.headers.Authorization) return config

        const session = await auth()
        if (session?.error) return config
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosServer.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshed = await getFreshAccessTokenServer()
                if (refreshed?.error || !refreshed?.accessToken) {
                    return Promise.reject(error)
                }

                originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`
                return axiosServer(originalRequest)
            } catch {
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosServer
