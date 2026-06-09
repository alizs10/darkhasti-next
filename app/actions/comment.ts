"use server"

import { ActionResult, ApiResponse, Comment, CommentInputs, CommentOrder, UpdateCommentInputs } from "../types";
import axiosServer from "../lib/axios-server";
import { parseApiError } from "../lib/error-handler";
import { cached } from "../lib/cache";


export async function storeComment(inputs: CommentInputs): Promise<ActionResult<Comment>> {
    try {
        const res = await axiosServer.post<ApiResponse<Comment>>(`/comments`, inputs);

        if (!res.data.data) {
            return {
                success: false,
                error: {
                    message: "No data returned from server",
                },
            };
        }

        return {
            success: true,
            data: res.data.data,
        };

    } catch (error) {

        return {
            success: false,
            error: parseApiError(error),
        };
    }

}

export const getComment = cached(async (comment_id: number | string) => {
    try {
        const result = await axiosServer.get<ApiResponse<Comment>>(`/comments/${comment_id}`)

        // console.log(result)

        return result.data;

    } catch (error) {
        console.log(error)
    }
})

export const getMyComment = cached(async (comment_id: number | string) => {
    try {
        const result = await axiosServer.get<ApiResponse<Comment>>(`/my/comments/${comment_id}`)

        // console.log(result)

        return result.data;

    } catch (error) {
        console.log(error)
    }
})

export async function getComments(id: number | string, type: 'comment' | 'request', order: CommentOrder) {
    // Use the correct endpoint - for comment replies, use /replies not /comments
    const url = type === 'request'
        ? `/requests/${id}/comments?order=${order}`
        : `/comments/${id}/replies?order=${order}`;

    try {
        const result = await axiosServer.get<ApiResponse<Comment[]>>(url);
        return result.data;
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        return null;
    }
}


export async function updateComment(id: string | number, inputs: UpdateCommentInputs): Promise<ActionResult<Comment>> {
    try {
        const res = await axiosServer.put<ApiResponse<Comment>>(`/comments/${id}`, inputs);

        if (!res.data.data) {
            return {
                success: false,
                error: {
                    message: "No data returned from server",
                },
            };
        }

        return {
            success: true,
            data: res.data.data,
        };

    } catch (error) {

        return {
            success: false,
            error: parseApiError(error),
        };
    }

}

export async function deleteCommentReq(comment_id: string | number): Promise<ActionResult> {
    try {
        const res = await axiosServer.delete<ApiResponse>(`/comments/${comment_id}`);

        if (!res.data.data) {
            return {
                success: false,
                error: {
                    message: "No data returned from server",
                },
            };
        }

        return {
            success: true
        };

    } catch (error) {

        return {
            success: false,
            error: parseApiError(error),
        };
    }
}