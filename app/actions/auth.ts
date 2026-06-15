"use server"

import axiosServer from "../lib/axios-server"
import { parseApiError } from "../lib/error-handler"
import { ActionResult, ApiResponse, CheckUsernameInputs, CheckUsernameResponse } from "../types"

interface RegisterInputs {
    username: string
    password: string
    password_confirmation: string
}

export interface RegisterResponse {
    user: { id: number; username: string }
}

interface ChangePasswordInputs {
    current_password: string
    new_password: string
    new_password_confirmation: string
}

export async function handleRegister(
    inputs: RegisterInputs
): Promise<ActionResult<RegisterResponse>> {
    try {
        const res = await axiosServer.post<ApiResponse<RegisterResponse>>("/register", inputs)

        if (!res.data.data) {
            return { success: false, error: { message: "No data returned from server" } }
        }

        return { success: true, data: res.data.data }
    } catch (error) {
        return { success: false, error: parseApiError(error) }
    }
}

export async function changePasswordReq(inputs: ChangePasswordInputs): Promise<ActionResult> {
    try {
        const res = await axiosServer.post<ApiResponse>("/change-password", inputs)

        if (!res.data.success) {
            return { success: false, error: { message: "No data returned from server" } }
        }

        return { success: true }
    } catch (error) {
        return { success: false, error: parseApiError(error) }
    }
}

export async function logoutReq() {
    try {
        const res = await axiosServer.post<ApiResponse>("/logout")
        return res.status === 200
    } catch {
        return false
    }
}

export async function checkUsernameReq(
    inputs: CheckUsernameInputs
): Promise<ActionResult<CheckUsernameResponse>> {
    try {
        const res = await axiosServer.post<ApiResponse<CheckUsernameResponse>>(
            "/check-username",
            inputs
        )

        if (!res.data.data) {
            return { success: false, error: { message: "No data returned from server" } }
        }

        return { success: true, data: res.data.data }
    } catch (error) {
        return { success: false, error: parseApiError(error) }
    }
}
