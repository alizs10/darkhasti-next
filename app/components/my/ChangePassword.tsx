"use client"

import { handleChangePassword } from '@/app/actions/auth';
import { LockIcon } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'

export default function ChangePassword() {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handler = async (e: ChangeEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(null); // Clear previous errors

        try {
            await handleChangePassword(
                {
                    current_password: password,
                    new_password: newPassword,
                    new_password_confirmation: newPasswordConfirmation,
                }
            );

        } catch (error) {

            setError("Something went wrong!")

        }



    };

    return (

        <form onSubmit={handler}>

            {error && (
                <div className="text-red-500 text-sm text-center mb-2">{error}</div>
            )}

            <div className="mt-8 flex flex-col gap-y-2">

                <h2 className="text-sm border-b border-muted pb-2">تغییر کلمه عبور</h2>

                <span className="text-xs text-muted-foreground text-justify leading-relaxed">توجه: امکان بازیابی کلمه عبور وجود ندارد. </span>


                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="کلمه عبور فعلی" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <input type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="کلمه عبور جدید" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <input type="password"
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    placeholder="تکرار کلمه عبور جدید" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />

                <button type='submit' className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                    <LockIcon className="size-4" />
                    <span>تغییر کلمه عبور</span>
                </button>
            </div>
        </form>

    )
}
