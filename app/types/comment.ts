import { Request } from "./request";
import { User } from "./user";

export interface Comment {
    id: number;
    author_id: number;
    body: string;
    is_chosen_answer: boolean;
    parent_id: number | null;
    request_id: number;
    request?: Request;
    author?: User;
    likes_count: number;
    dislikes_count: number;
    replies_count: number;
    attached_files: any[];
    // childs: Comment[];
    created_at: string;
    updated_at: string;
    user_vote_status?: "like" | "dislike" | null,
    ancestors?: Comment,
}

export type CommentOrder = "new" | "old" | "favorite" | "comment"

export interface CommentInputs {
    request_id: string | number;
    parent_id?: string | number;
    body: string;
    temp_files?: string[]
}

export interface UpdateCommentInputs {
    body: string;
    deleted_main_files?: string[]
    temp_files?: string[]
}