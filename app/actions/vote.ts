"use server"

import { VoteResponse } from "../types/vote";
import axiosServer from "../lib/axios-server";
import { ActionResult, ApiResponse } from "../types";
import { parseApiError } from "../lib/error-handler";


interface VoteInputs {
    id: string | number;
    type: "request" | "comment";
    vote: "like" | "dislike";
}

export async function handleVote(inputs: VoteInputs): Promise<ActionResult<VoteResponse>> {
    try {
        const res = await axiosServer.post<ApiResponse<VoteResponse>>(`/vote`, inputs);

        const data = res.data.data

        if (!data) {
            return {
                success: false,
                error: {
                    message: "خطا! دوباره تلاش کنید"
                }
            }
        }

        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.error("Backend failed:", error);
        // Continue anyway - we still want to clear local session
        return {
            success: false,
            error: parseApiError(error)
        }
    }

}