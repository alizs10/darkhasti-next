import Profile from "@/app/components/my/Profile";
import axiosServer from "@/app/lib/axios-server";
import { ApiResponse, ProfileResponse } from "@/app/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'درخواستی | پروفایل کاربری',
};



// Accept the token so we don't need a second auth() call inside getUserStats
async function getUserStats() {
    try {
        const result = await axiosServer.get<ApiResponse<ProfileResponse>>("/profile/stats")
        return result.data?.data?.stats;
    } catch (error) {
        // console.log(error)
        console.log("error getting stats", error)
        throw new Error("Failed to fetch stats")
    }
}

export default async function ProfilePage() {


    const stats = await getUserStats()
    console.log("stats are: ", stats)

    if (!stats) {
        return null;
    }
    return (
        <Profile stats={stats} />
    )
}
