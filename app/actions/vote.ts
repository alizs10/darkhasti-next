"use server"

import { VoteResponse } from "../types/vote";
import axiosServer from "../lib/axios-server";
import { ApiResponse } from "../types";


interface VoteInputs {
    id: string | number;
    type: "request" | "comment";
    vote: "like" | "dislike";
}

export async function handleVote(inputs: VoteInputs) {
    try {
        const res = await axiosServer.post<ApiResponse<VoteResponse>>(`/vote`, inputs);

        return res.data;
    } catch (error) {
        console.error("Backend failed:", error);
        // Continue anyway - we still want to clear local session
    }

}