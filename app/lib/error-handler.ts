// lib/error-handler.ts

import axios from "axios";
import { AppError } from "@/app/types";

export function parseApiError(error: unknown): AppError {

    if (axios.isAxiosError(error)) {

        const status = error.response?.status;

        const data = error.response?.data;

        return {
            status,
            message:
                data?.message ||
                error.message ||
                "Something went wrong",

            fieldErrors: data?.errors ?? {},
        };
    }

    return {
        message: "Unexpected error occurred",
    };
}