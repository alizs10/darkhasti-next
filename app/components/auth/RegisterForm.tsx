import { ArrowLeftIcon } from 'lucide-react'

export default function RegisterForm() {
    return (
        <div className="flex flex-col gap-y-2 w-80 mx-auto">
            <input type="text" placeholder="نام کاربری" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
            <input type="password" placeholder="کلمه عبور" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
            <input type="password" placeholder="تکرار کلمه عبور" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
            <button className="mt-2 mx-auto flex-row-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                <span>ثبت نام</span>
                <ArrowLeftIcon className="size-4" />
            </button>
        </div>
    )
}
