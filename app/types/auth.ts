import { User } from "./user";

export interface LoginResponse {
    user: User;
    access_token: string;
    expires_in: number;
}

export interface CheckUsernameInputs {
    username: string;
}

export interface CheckUsernameResponse {
    is_available: boolean
}