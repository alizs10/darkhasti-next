import { handleLogout } from "@/app/actions/auth";
import { LockIcon, LogOutIcon, TrashIcon, UserPenIcon } from "lucide-react";
import Link from "next/link";
import Username from "./Username";
import { auth } from "@/app/lib/auth";
import axios from "@/app/lib/axios";
import ChangePassword from "./ChangePassword";

interface IProfileStats {
    message: string;
    stats: {
        requests_count: number;
        comments_count: number;
        chosen_comments_count: number
    }
}

async function getUserStats() {
    try {
        const result = await axios.get<IProfileStats>("/profile/stats")

        return result.data.stats;

    } catch (error) {
        console.log(error)
    }
}

export default async function Profile() {

    const session = await auth()
    const stats = await getUserStats()

    return (
        <div className='py-10 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 max-w-6xl md:mx-auto flex-1 w-full'>

            <div className="flex-center-between">
                <h2 className="text-base font-semibold">پروفایل کاربری شما</h2>


                <Link href={"/my/requests"} className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                    <span>درخواست های من</span>
                </Link>
            </div>


            {/* stats */}
            <div className="mt-8 flex flex-col gap-y-2">
                <h2 className="text-sm border-b border-muted pb-2">آمار حساب کاربری</h2>
                <div className="bg-muted rounded-3xl flex flex-nowrap divide-x divide-muted-foreground/10">

                    <div className="flex-1 px-2 flex-center flex-col gap-y-4 py-6">
                        <span className="text-xs text-nowrap">درخواست ها</span>
                        <span className="text-3xl font-bold">{stats?.requests_count ?? "خطا"}</span>
                    </div>
                    <div className="flex-1 flex-center flex-col gap-y-4 py-6">
                        <span className="text-xs text-nowrap">پاسخ ها</span>
                        <span className="text-3xl font-bold">{stats?.comments_count ?? "خطا"}</span>
                    </div>
                    <div className="flex-1 px-2 flex-center flex-col gap-y-4 py-6">
                        <span className="text-xs text-nowrap">پاسخ های منتخب</span>
                        <span className="text-3xl font-bold">{stats?.chosen_comments_count ?? "خطا"}</span>
                    </div>



                </div>
            </div>

            {/* username */}
            <Username current_username={session?.user.username} />

            {/* change password */}
            <ChangePassword />


            {/* delete account */}
            <div className="mt-8 flex flex-col gap-y-2">

                <h2 className="text-sm border-b border-muted pb-2">حذف حساب کاربری</h2>
                <span className="text-xs text-muted-foreground text-justify leading-relaxed">با حذف حساب کاربری تمامی اطلاعات شما(درخواست ها، پاسخ ها) از بین خواهد رفت و قابل برگشت نخواهد بود.</span>


                <button className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:destructive hover:border-destructive hover:bg-destructive/10 transition-colors duration-100 hover:outline-4 outline-destructive/10">
                    <TrashIcon className="size-4" />
                    <span>حذف حساب کاربری</span>
                </button>

            </div>


            {/* logout */}
            <div className="mt-8 flex flex-col gap-y-2">

                <h2 className="text-sm border-b border-muted pb-2">خروج از حساب کاربری</h2>
                <span className="text-xs text-muted-foreground text-justify leading-relaxed">با توجه به اینکه کلمه عبور قابل بازیابی نیست، پس درصورتیکه کلمه عبور خود را فراموش کرده باشید و از حساب کاربری خود خارج شوید، دیگر قادر به ورود به آن نخواهید بود.</span>

                <button onClick={handleLogout} className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:destructive hover:border-destructive hover:bg-destructive/10 transition-colors duration-100 hover:outline-4 outline-destructive/10">
                    <LogOutIcon className="size-4" />
                    <span>خروج از حساب کاربری</span>
                </button>

            </div>


        </div>
    )
}
