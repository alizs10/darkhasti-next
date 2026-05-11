// lib/axios.ts
import axios from "axios";
import { auth } from "@/app/lib/auth";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // Use NEXT_PUBLIC_ for client
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Important if your backend uses cookies too
});

// ==================== REQUEST INTERCEPTOR ====================
instance.interceptors.request.use(
    async (config) => {
        const session = await auth(); // Get current session (works in server actions too)

        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ==================== RESPONSE INTERCEPTOR (Refresh Logic) ====================
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

instance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Wait for the refresh to complete
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return instance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const session = await auth();

                if (!session?.access_token) {
                    throw new Error("No token available");
                }

                // Call your refresh endpoint
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`,
                        },
                    }
                );

                const newAccessToken = response.data.access_token;

                // Update session (this is limited in v5, but we can still use the token)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                isRefreshing = false;

                return instance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;

                // Optional: Force logout if refresh fails
                // await signOut({ callbackUrl: "/auth/signin" });

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;