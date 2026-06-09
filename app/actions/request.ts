"use server"

// import { redirect } from "next/navigation";
import { ActionResult, ApiResponse, Comment, CreateRequestInputs, Request, RequestOrder, UpdateRequestInputs } from "../types";
// import { serverGet } from "../lib/axios-server";
import axiosServer from "../lib/axios-server";
import { redirect } from "next/navigation";
import { parseApiError } from "../lib/error-handler";
import { cached } from "../lib/cache";
// import { fetchWithAuth } from "../lib/api";
// import { postClient } from "../lib/api";




export async function getRequests(order: RequestOrder, search?: string | null) {
    try {

        let url = `/requests?order=${order}`

        if (search) {
            url += `&search=${search}`
        }

        console.log(url)

        const result = await axiosServer.get<ApiResponse<Request[]>>(url)


        console.log(result.data)

        return result.data;

    } catch (error) {
        console.log(error)
    }
}

export async function getRelatedRequests(request_id: string | number) {
    try {

        let url = `/requests/${request_id}/related`

        const result = await axiosServer.get<ApiResponse<Request[]>>(url)

        return result.data;

    } catch (error) {
        console.log(error)
    }
}

export async function getMyRequests(order: RequestOrder) {
    try {
        const result = await axiosServer.get<ApiResponse<Request[]>>(`/my/requests?order=${order}`)


        return result.data;

    } catch (error) {
        console.log(error)
    }
}

export async function handleCreateRequest(inputs: CreateRequestInputs): Promise<ActionResult<Request>> {
    try {

        const res = await axiosServer.post<ApiResponse<Request>>(`/requests`, inputs);

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


export const getRequest = cached(async (request_id: number | string) => {
    try {
        const result = await axiosServer.get<ApiResponse<Request>>(`/requests/${request_id}`)
        return result;

    } catch (error) {
        console.log(error)
    }
})

export const getMyRequest = cached(async (request_id: number | string) => {
    try {
        const result = await axiosServer.get<ApiResponse<Request>>(`/my/requests/${request_id}`)

        // console.log(result)

        return result.data;

    } catch (error) {
        console.log(error)
    }
})

export async function updateRequest(id: string | number, inputs: UpdateRequestInputs): Promise<ActionResult<Request>> {
    try {
        const res = await axiosServer.put<ApiResponse<Request>>(`/requests/${id}`, inputs);
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

export async function toggleChosenAnswer(comment_id: string | number) {
    try {
        const res = await axiosServer.put<ApiResponse<Comment>>(`/requests/choose-answer/toggle`, {
            comment_id
        });

        return res.data

    } catch (error) {
        console.error("Backend failed:", error);
        // Continue anyway - we still want to clear local session
    }

}

export async function deleteRequestReq(request_id: string | number): Promise<ActionResult> {
    try {
        const res = await axiosServer.delete<ApiResponse>(`/requests/${request_id}`);

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