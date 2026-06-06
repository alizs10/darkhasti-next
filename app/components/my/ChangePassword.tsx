"use client"

import { changePasswordReq } from '@/app/actions/auth';
import { LockIcon } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'
import { Button } from '../common/Button';
import { Typography } from '../common/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '@/app/schemas/auth';
import PasswordInput from '../Form/PasswordInput';
import z from 'zod';
import { toast } from 'sonner';
import { logoutHandler } from './Logout';

type ChangePasswordFormValues = z.infer<
    typeof changePasswordSchema
>

export default function ChangePassword() {

    const [isLoading, setIsLoading] =
        useState(false)
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        watch,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        mode: 'onChange',
        defaultValues: {
            password: '',
            new_password: '',
            new_password_confirmation: '',
        },
    })


    const onSubmit = async (
        data: ChangePasswordFormValues
    ) => {
        if (isLoading) return

        setIsLoading(true)

        const res = await changePasswordReq({
            current_password: data.password,
            new_password: data.new_password,
            new_password_confirmation: data.new_password_confirmation
        })

        if (!res.success) {
            toast.error(
                res.error?.message
            )

            setIsLoading(false)
            return
        }

        toast.success(
            'تغییر کلمه عبور با موفقیت انجام شد. لطفا دوباره وارد شوید.'
        )

        setTimeout(async () => {

            await logoutHandler()

        }, 1000)

    };

    return (

        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
        >

            {error && (
                <div className="text-red-500 text-sm text-center mb-2">{error}</div>
            )}

            <div className="mt-8 flex flex-col gap-y-2">

                <Typography variant="body" weight="medium" className="border-b border-muted pb-2">
                    تغییر کلمه عبور
                </Typography>
                <Typography variant="caption-xs" className="text-muted-foreground text-justify">توجه: امکان بازیابی کلمه عبور وجود ندارد.
                </Typography>

                {/* <input type="password"
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
                    placeholder="تکرار کلمه عبور جدید" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" /> */}

                <PasswordInput
                    {...register('password')}

                    placeholder="کلمه عبور فعلی"
                    error={
                        errors.password
                            ?.message
                    }
                />
                <PasswordInput
                    {...register('new_password')}

                    placeholder="کلمه عبور جدید"
                    error={
                        errors.new_password
                            ?.message
                    }
                />

                <PasswordInput
                    {...register('new_password_confirmation')}
                    placeholder="تکرار کلمه عبور جدید"
                    error={
                        errors
                            .new_password_confirmation
                            ?.message
                    }
                />


                <Button
                    disabled={
                        isLoading ||
                        !isValid
                    }
                    type='submit'
                    className=""
                    variant="outline-primary"
                    size="sm"
                    rightIcon={<LockIcon className="size-4" />}
                >
                    <Typography variant="caption-xs" weight="medium">
                        تغییر کلمه عبور
                    </Typography>
                </Button>
            </div>
        </form>

    )
}
