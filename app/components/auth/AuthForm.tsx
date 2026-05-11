'use client'

import { useState } from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"

export default function AuthForm() {

    const [formType, setFormType] = useState<"register" | "login">("register")

    return (

        <>
            <div className="flex-row-center gap-x-1 rounded-full bg-muted p-1 mx-auto">
                <button onClick={() => setFormType("login")} className={`px-4 py-1 rounded-full ${formType === 'login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}  hover:text-primary-foreground hover:bg-primary transition-colors duration-100 text-sm`}>ورود</button>
                <button onClick={() => setFormType("register")} className={`px-4 py-1 rounded-full ${formType === 'register' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}  hover:text-primary-foreground hover:bg-primary transition-colors duration-100 text-sm`}>ثبت نام</button>
            </div>

            {formType === 'register' ? <RegisterForm /> : <LoginForm />}
        </>

    )

}
