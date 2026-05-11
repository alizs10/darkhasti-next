import { ArrowDownIcon, ChevronDownIcon, LockIcon, LogOutIcon, TrashIcon, UserPenIcon } from "lucide-react";
import Link from "next/link";

export default function Profile() {
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
                        <span className="text-3xl font-bold">۱۲۰</span>
                    </div>
                    <div className="flex-1 flex-center flex-col gap-y-4 py-6">
                        <span className="text-xs text-nowrap">پاسخ ها</span>
                        <span className="text-3xl font-bold">۱۲۰</span>
                    </div>
                    <div className="flex-1 px-2 flex-center flex-col gap-y-4 py-6">
                        <span className="text-xs text-nowrap">پاسخ های منتخب</span>
                        <span className="text-3xl font-bold">۱۲۰</span>
                    </div>



                </div>
            </div>

            {/* username */}
            <div className="mt-8 flex flex-col gap-y-2">

                <h2 className="text-sm border-b border-muted pb-2">نام کاربری</h2>
                <input type="email" value={"aure10"} placeholder="نام کاربری" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />

                <button className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                    <UserPenIcon className="size-4" />
                    <span>تغییر نام کاربری</span>
                </button>
            </div>

            {/* change password */}
            <div className="mt-8 flex flex-col gap-y-2">

                <h2 className="text-sm border-b border-muted pb-2">تغییر کلمه عبور</h2>

                <span className="text-xs text-muted-foreground text-justify leading-relaxed">توجه: امکان بازیابی کلمه عبور وجود ندارد. </span>


                <input type="password" placeholder="کلمه عبور فعلی" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <input type="password" placeholder="کلمه عبور جدید" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <input type="password" placeholder="تکرار کلمه عبور جدید" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />

                <button className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                    <LockIcon className="size-4" />
                    <span>تغییر کلمه عبور</span>
                </button>
            </div>


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

                <button className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:destructive hover:border-destructive hover:bg-destructive/10 transition-colors duration-100 hover:outline-4 outline-destructive/10">
                    <LogOutIcon className="size-4" />
                    <span>خروج از حساب کاربری</span>
                </button>

            </div>


        </div>
    )
}
