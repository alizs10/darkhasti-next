import axios from "axios"
import { auth } from "@/app/lib/auth"

const axiosServer = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
})

axiosServer.interceptors.request.use(
    async (config) => {
        if (config.headers.Authorization) return config

        const session = await auth()

        // ❌ no session → just proceed (or block depending on your API rules)
        if (!session || session.error) {
            console.log("axios-server => no session happened", session)
            return config
        }

        if (session.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// ❌ REMOVE ENTIRE RESPONSE INTERCEPTOR (important)
// NextAuth handles refresh already

export default axiosServer