"use client"

import axiosClient from "@/app/lib/axios-client"
import { ApiResponse } from "@/app/types"
import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "../common/Button"
import { Typography } from "../common/Typography"

export async function logoutHandler() {
    try {

        const res = await axiosClient.post<ApiResponse>("/logout")

        if (res.status === 200) {
            await signOut()
            return
        }
        throw new Error("Error while logging out")


    } catch (error) {
        console.log(error)
        throw new Error("Error while logging out")

    }
}

export default function Logout() {


    return (
        <div className="mt-8 flex flex-col gap-y-2">

            <Typography variant="body" weight="medium" className="border-b border-muted pb-2">
                خروج از حساب کاربری
            </Typography>
            <Typography variant="caption-xs" className="text-muted-foreground text-justify">
                با توجه به اینکه کلمه عبور قابل بازیابی نیست، پس درصورتیکه کلمه عبور خود را فراموش کرده باشید و از حساب کاربری خود خارج شوید، دیگر قادر به ورود به آن نخواهید بود.
            </Typography>


            <Button
                onClick={logoutHandler}
                type='submit'
                className=""
                variant="outline-primary"
                size="sm"
                rightIcon={<LogOutIcon className="size-4" />}
            >
                <Typography variant="caption-xs" weight="medium">
                    خروج از حساب کاربری
                </Typography>
            </Button>

        </div>
    )
}
