export interface AttachedFile {
    id: string | number;
    user_id: string | number;
    file_name: string;
    file_size: number;
    mime_type: string;
    file_hash: string;
    file_path: string;
    attachable_id?: number;
    attachable_type?: "App\\Models\\Request" | "App\\Models\\Comment"
    expires_at: string;
    created_at: string;
    updated_at: string;
    uploading?: boolean;
    uploaded_bytes?: number;
    temp_id?: string;
    disk?: "main" | "temp";
    status?: "deleted"
}