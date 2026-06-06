'use client'

import { useEffect, useState } from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Typography } from "../common/Typography"

export default function zAuthForm() {

    const searchparams = useSearchParams()
    const selected_form = searchparams.get("form") === "register" ? "register" : "login"

    return (

        <>
            <div className="relative flex-row-center gap-x-1 rounded-full bg-secondary p-1 mx-auto">


                <button type="button" className={`absolute z-0 top-1 bottom-1 px-4 py-1 rounded-full ${selected_form === 'login' ? 'left-full -translate-x-[calc(100%+0.25rem)]' : 'left-0 translate-x-1'} bg-primary text-transparent transition-all text-nowrap duration-200 text-sm`}>
                    <Typography
                        variant="caption"
                    >
                        {selected_form === 'login' ? 'ورود' : 'ثبت نام'}
                    </Typography>
                </button>


                <Link

                    href={"/auth?form=login"} className={`relative z-10 px-4 py-1 rounded-full ${selected_form === 'login' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}  transition-all duration-200 text-sm`}>
                    <Typography
                        variant="caption"
                    >
                        ورود
                    </Typography>
                </Link>
                <Link

                    href={"/auth?form=register"} className={`relative z-10 px-4 py-1 rounded-full ${selected_form === 'register' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}  transition-all duration-200 text-sm`}>
                    <Typography
                        variant="caption"
                    >
                        ثبت نام
                    </Typography>
                </Link>
            </div>

            {selected_form === 'register' ? <RegisterForm /> : <LoginForm />}
        </>

    )

}
