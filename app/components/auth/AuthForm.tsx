'use client'

import { useEffect, useState } from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthForm() {

    const searchparams = useSearchParams()
    const selected_form = searchparams.get("form") === "register" ? "register" : "login"


    return (

        <>
            <div className="flex-row-center gap-x-1 rounded-full bg-muted p-1 mx-auto">
                <Link href={"/auth?form=login"} className={`px-4 py-1 rounded-full ${selected_form === 'login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}  hover:text-primary-foreground hover:bg-primary transition-colors duration-100 text-sm`}>ورود</Link>
                <Link href={"/auth?form=register"} className={`px-4 py-1 rounded-full ${selected_form === 'register' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}  hover:text-primary-foreground hover:bg-primary transition-colors duration-100 text-sm`}>ثبت نام</Link>
            </div>

            {selected_form === 'register' ? <RegisterForm /> : <LoginForm />}
        </>

    )

}
