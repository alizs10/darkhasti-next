"use client"

import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "../common/Button"
import { Typography } from "../common/Typography"
import { logoutReq } from "@/app/actions/auth"

export async function logoutHandler() {

    const res = await logoutReq()

    console.log(res)

    if (!res) return

    await signOut()

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
