import { AttachedFile } from "./attached-file";
import { Comment } from "./comment";
import { User } from "./user"

export interface Request {
    id: number,
    title: string,
    description: string,
    published_at: Date,
    author_id: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null,
    replies_count: number,
    is_answered: boolean,
    visits_count: number,
    likes_count: number,
    dislikes_count: number,
    author?: User,
    attached_files: AttachedFile[],
    chosen_answer: Comment | null,
    user_vote_status?: "like" | "dislike" | null,

}

export type RequestOrder = "visit" | "new" | "favorite" | "comment" | "old"

export interface CreateRequestInputs {
    title: string;
    description: string;
    temp_files?: string[];
    save_as_draft?: boolean;
}

export interface UpdateRequestInputs {
    title: string;
    description: string;
    deleted_main_files?: string[]
    temp_files?: string[]
    save_as_draft?: boolean;
}