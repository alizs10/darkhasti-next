export interface ChangeUsernameInputs {
    username: string
}

export interface DeleteAccountInputs {
    password: string
}

export interface ProfileResponse {
    stats: ProfileStats
}

export interface ProfileStats {
    requests_count: number;
    comments_count: number;
    chosen_comments_count: number
}