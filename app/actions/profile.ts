"use server"

import { ActionResult, ApiResponse, ChangeUsernameInputs, DeleteAccountInputs, User } from "../types";
import axiosServer from "../lib/axios-server";
import { parseApiError } from "../lib/error-handler";
import axios from "axios";

export async function changeUsernameReq(inputs: ChangeUsernameInputs): Promise<ActionResult<User>> {
    try {
        const res = await axiosServer.put<ApiResponse<User>>("/profile/change-username", inputs);

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

export async function deleteAccountReq(inputs: DeleteAccountInputs): Promise<ActionResult> {
    try {
        const res = await axiosServer.post<ApiResponse<User>>("/profile/delete-account", inputs);


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


        const parsedError = parseApiError(error);

        if (parsedError.status === 422) {
            return {
                success: false,
                error: {
                    message: "کلمه عبور اشتباه است"
                }
            }
        }

        return {
            success: false,
            error: parseApiError(error),
        };
    }
}
