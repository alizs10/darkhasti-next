"use server"

// actions/attached-file.ts

import axiosServer from "../lib/axios-server";
import { ApiResponse, AttachedFile } from "../types";

export async function getMyTempFiles(attachable_type?: "App\\Models\\Comment" | "App\\Models\\Request", attachable_id?: number) {

    let url = `/temp-files/my`

    if (attachable_type) {
        url += `?attachable_type=${attachable_type}`
    }

    if (attachable_id) {
        url += `&attachable_id=${attachable_id}`
    }


    try {
        const res = await axiosServer.get<ApiResponse<AttachedFile[]>>(url);

        return res.data;
    } catch (error) {
        console.error("Backend failed:", error);
        // Continue anyway - we still want to clear local session
    }

}

export async function handleDeleteTempFile(fileId: number | string) {
    try {
        const res = await axiosServer.delete<ApiResponse>(`/temp-files/${fileId}`);

        return res.data;
    } catch (error) {
        console.error("Backend failed:", error);
        // Continue anyway - we still want to clear local session
    }

}


export async function uploadTempFiles(formData: FormData) {
    try {
        const res = await axiosServer.post<ApiResponse<AttachedFile[]>>(
            `/temp-files/upload`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return res.data;
    } catch (error) {
        console.error("Backend failed:", error);
    }
}