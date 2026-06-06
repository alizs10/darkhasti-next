// import { handleLogout } from "@/app/actions/auth";
import { LogOutIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import Username from "./Username";
import ChangePassword from "./ChangePassword";
import axiosServer from "@/app/lib/axios-server";
import { ApiResponse } from "@/app/types";
import { auth } from "@/app/lib/auth";
import Logout from "./Logout";
import DeleteAcc from "./DeleteAcc";
import { Button } from "../common/Button";
import { Typography } from "../common/Typography";

interface ProfileResponse {
    stats: {
        requests_count: number;
        comments_count: number;
        chosen_comments_count: number
    }
}

async function getUserStats() {
    try {
        const result = await axiosServer.get<ApiResponse<ProfileResponse>>("/profile/stats")

        console.log(result)

        return result.data?.data?.stats;

    } catch (error) {
        console.log(error)
    }
}


export default async function Profile() {

    const stats = await getUserStats()

    if (!stats) {
        return null;
    }


    const session = await auth()
    if (!session?.user) {
        return null
    }
    const { user } = session;




    return (
        <div className='py-10 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 max-w-6xl md:mx-auto flex-1 w-full'>

            <div className="flex-center-between">

                <Typography variant="h4" className="">
                    پروفایل کاربری شما
                </Typography>

                <Button
                    href={"/my/requests"}
                    className=""
                    variant="outline-primary"
                    size="sm"

                >
                    <Typography variant="caption">
                        درخواست های من
                    </Typography>
                </Button>

            </div>


            {/* stats */}
            <div className="mt-8 flex flex-col gap-y-2">
                <Typography variant="body" weight="medium" className="border-b border-muted pb-2">
                    آمار حساب کاربری
                </Typography>
                <div className="bg-secondary rounded-3xl flex flex-nowrap divide-x divide-muted-foreground/10">

                    <div className="flex-1 px-2 flex-center flex-col gap-y-4 py-6">
                        <Typography variant="caption-xs">
                            درخواست ها
                        </Typography>

                        <Typography variant="display">
                            {stats?.requests_count ?? "خطا"}
                        </Typography>

                    </div>
                    <div className="flex-1 flex-center flex-col gap-y-4 py-6">
                        <Typography variant="caption-xs">
                            پاسخ ها
                        </Typography>

                        <Typography variant="display">
                            {stats?.comments_count ?? "خطا"}
                        </Typography>
                    </div>
                    <div className="flex-1 px-2 flex-center flex-col gap-y-4 py-6">
                        <Typography variant="caption-xs">
                            پاسخ های منتخب
                        </Typography>

                        <Typography variant="display">
                            {stats?.chosen_comments_count ?? "خطا"}
                        </Typography>
                    </div>



                </div>
            </div>

            {/* username */}
            <Username current_username={user?.username ?? ""} />

            {/* change password */}
            <ChangePassword />


            {/* delete account */}
            <DeleteAcc />


            {/* logout */}
            <Logout />


        </div>
    )
}
