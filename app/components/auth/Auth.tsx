import { ArrowLeftIcon, MoveLeft } from "lucide-react";
import AuthForm from "./AuthForm";

export default function Auth() {
    return (

        <div className="flex flex-col gap-y-6">
            <AuthForm />

            <span className="text-xs text-muted-foreground leading-relaxed px-4 text-center">توجه: امکان بازیابی کلمه عبور وجود ندارد. درصورت فراموش کردن کلمه عبور خود باید حساب کاربری دیگری بسازید.</span>
        </div>
    )
}
