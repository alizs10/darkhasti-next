"use server";

import axiosServer from "../lib/axios-server";
import { parseApiError } from "../lib/error-handler";
import { ActionResult, ApiResponse, CheckUsernameInputs, CheckUsernameResponse } from "../types";

interface RegisterInputs {
    username: string;
    password: string;
    password_confirmation: string;
}
export interface RegisterResponse {
    user: {
        id: number,
        username: string
    }
}

interface ChangePasswordInputs {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}


export async function handleRegister(
    inputs: RegisterInputs
): Promise<ActionResult<RegisterResponse>> {

    try {

        const res = await axiosServer.post<
            ApiResponse<RegisterResponse>
        >("/register", inputs);

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

export async function changePasswordReq(inputs: ChangePasswordInputs): Promise<ActionResult> {
    try {
        const res = await axiosServer.post<ApiResponse>("/change-password", inputs);

        if (!res.data.success) {
            return {
                success: false,
                error: {
                    message: "No data returned from server",
                },
            };
        }

        return {
            success: true,
        };

    } catch (error) {

        return {
            success: false,
            error: parseApiError(error),
        };
    }
}

export async function handleLogout() {
    try {
        return await axiosServer.post<ApiResponse>(`/logout`);
    } catch (error) {
        console.error("Backend logout failed:", error);
        throw new Error("Error while logging out")
    }
}

export interface SessionUpdateData {
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
    refreshExpiresIn?: number
    tokenType?: string
}

// export async function updateSession(updatedData: SessionUpdateData) {
//     const session = await auth()

//     if (!session) {
//         throw new Error("No active session")
//     }

//     // Update the session - this triggers the JWT callback with trigger="update"
//     await unstable_update({
//         ...session,
//         ...updatedData
//     })
// }

export interface TokenData {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
    refresh_expires_in: number
}

export async function refresh(refreshToken: string | undefined): Promise<TokenData> {
    if (!refreshToken) throw new Error("No refresh token provided");


    try {
        const response = await fetch(`${process.env.BACKEND_API_URL}/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Refresh failed: ${response.status}`);
        }

        const data = await response.json();
        return {
            access_token: data.data.access_token,
            refresh_token: data.data.refresh_token,
            token_type: data.data.token_type,
            expires_in: data.data.expires_in,
            refresh_expires_in: data.data.refresh_expires_in,
        };
    } catch (error) {
        console.log(error)
        throw new Error("Error while refreshing token")
    }


}

export async function checkUsernameReq(
    inputs: CheckUsernameInputs
): Promise<ActionResult<CheckUsernameResponse>> {

    try {

        const res = await axiosServer.post<
            ApiResponse<CheckUsernameResponse>
        >("/check-username", inputs);

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