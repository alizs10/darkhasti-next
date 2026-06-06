// lib/upload-temp-files.ts
import { AttachedFile, ApiResponse } from "../types"
import axiosClient from "./axios-client"

export async function uploadTempFilesWithProgress(
    file: File,
    attachable_type: "App\\Models\\Comment" | "App\\Models\\Request",
    onProgress: (loaded: number) => void,
    attachable_id?: number,
): Promise<AttachedFile> {
    const fd = new FormData()
    fd.append('files[]', file)
    fd.append('attachable_type', attachable_type)

    if (attachable_id) {
        fd.append('attachable_id', attachable_id.toString())
    }

    try {

        const res = await axiosClient.post<ApiResponse<AttachedFile[]>>(
            '/temp-files/upload',
            fd,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: async (e) => {
                    if (e.loaded) {
                        onProgress(e.loaded)
                    }
                },
            }
        )

        const data = res.data.data;

        if (data && data?.length > 0) {
            return data[0]
        }

        throw new Error("error while uploading files")

    } catch (error) {
        throw new Error("error while uploading files...")
    }
}