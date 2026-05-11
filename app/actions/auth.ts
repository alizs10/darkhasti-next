"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/app/lib/auth";
import axios from "@/app/lib/axios"

interface RegisterInputs {
    username: string;
    password: string;
    password_confirmation: string;
}

interface ChangePasswordInputs {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}

export async function handleRegister(inputs: RegisterInputs) {
    try {

        const res = await axios.post(`/register`, inputs);

        if (res.status !== 200) {
            throw new Error("wrong credentials")
            return
        }



    } catch (error) {
        console.error("Backend logout failed:", error);
        // Continue anyway - we still want to clear local session
    }

    redirect("/auth?form=login");

}

export async function handleChangePassword(inputs: ChangePasswordInputs) {
    const res = await axios.post("/change-password", inputs);

    if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to change password");
    }

    // If we reach here → success
    await signOut({ redirect: false });
    redirect("/auth");
}

export async function handleLogout() {
    try {
        // Step 1: Call your backend logout API first (to invalidate token on server)
        const session = await auth(); // get current session

        if (session?.access_token) {
            await axios.post(`/logout`);
        }
    } catch (error) {
        console.error("Backend logout failed:", error);
        // Continue anyway - we still want to clear local session
    }

    // Step 2: Clear NextAuth session
    await signOut({ redirect: false });

    // Step 3: Redirect to login (or home)
    redirect("/");
}