import { ArrowLeftIcon, MoveLeft } from "lucide-react";
import AuthForm from "./AuthForm";
import { Typography } from "../common/Typography";

export default function Auth() {
    return (

        <div className="flex flex-col gap-y-6">
            <AuthForm />

            <Typography
                variant="caption-xs"
                className="text-muted-foreground px-4"
            >
                توجه: امکان بازیابی کلمه عبور وجود ندارد. درصورت فراموش کردن کلمه عبور خود باید حساب کاربری دیگری بسازید.
            </Typography>
        </div>
    )
}
