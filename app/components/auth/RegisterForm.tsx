'use client'

import { checkUsernameReq, handleRegister } from '@/app/actions/auth'
import { registerSchema } from '@/app/schemas/auth'
import { ValidationMessages } from '@/app/lib/validation-messages'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import TextInput from '../Form/TextInput'
import PasswordInput from '../Form/PasswordInput'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'

import { useDebounce } from '@/app/hooks/useDebounce'

import clsx from 'clsx'

type RegisterFormValues = z.infer<
    typeof registerSchema
>

export default function RegisterForm() {
    const router = useRouter()

    const [isLoading, setIsLoading] =
        useState(false)

    const [
        usernameAvailability,
        setUsernameAvailability,
    ] = useState<boolean | null>(null)

    const [
        isCheckingUsername,
        setIsCheckingUsername,
    ] = useState(false)

    const {
        register,
        watch,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
            password_confirmation: '',
        },
    })

    const username = watch('username')

    const debouncedUsernameTerm =
        useDebounce(username, 1000)

    useEffect(() => {
        if (
            !debouncedUsernameTerm ||
            debouncedUsernameTerm.trim().length < 3
        ) {
            setUsernameAvailability(null)

            return
        }

        const checkUsername = async () => {
            setIsCheckingUsername(true)

            try {
                const res =
                    await checkUsernameReq({
                        username:
                            debouncedUsernameTerm.trim(),
                    })

                const isAvailable =
                    res.data?.is_available ??
                    false

                setUsernameAvailability(
                    isAvailable
                )
            } catch (error) {
                console.error(error)
            } finally {
                setIsCheckingUsername(
                    false
                )
            }
        }

        checkUsername()
    }, [
        debouncedUsernameTerm,
        errors.username?.message,
    ])

    const onSubmit = async (
        data: RegisterFormValues
    ) => {
        if (isLoading || !usernameAvailability) return

        setIsLoading(true)

        const res = await handleRegister(data)

        if (!res.success) {
            toast.error(
                res.error?.message
            )

            setIsLoading(false)
            return
        }

        toast.success(
            'ثبت نام با موفقیت انجام شد. لطفا وارد شوید.'
        )

        router.push(
            '/auth?form=login'
        )
    }

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
        >
            <div className="flex flex-col gap-y-2 w-80 mx-auto">
                <div className="flex flex-col gap-y-0.5">
                    <TextInput
                        {...register('username')}
                        placeholder="نام کاربری"
                        error={
                            errors.username
                                ?.message
                        }
                    />

                    {(isCheckingUsername ||
                        usernameAvailability !==
                        null) && (
                            <Typography
                                variant="caption-xs"
                                className={clsx({
                                    'text-muted-foreground':
                                        isCheckingUsername,

                                    'text-success':
                                        usernameAvailability &&
                                        !isCheckingUsername,

                                    'text-destructive':
                                        !usernameAvailability &&
                                        !isCheckingUsername,
                                })}
                            >
                                {isCheckingUsername
                                    ? 'در حال بررسی نام کاربری...'
                                    : usernameAvailability
                                        ? 'نام کاربری در دسترس است'
                                        : 'نام کاربری دیگری انتخاب کنید. این نام کاربری قبلاً ثبت شده است.'}
                            </Typography>
                        )}
                </div>

                <PasswordInput
                    {...register('password')}

                    placeholder="کلمه عبور"
                    error={
                        errors.password
                            ?.message
                    }
                />

                <PasswordInput
                    {...register('password_confirmation')}
                    placeholder="تکرار کلمه عبور"
                    error={
                        errors
                            .password_confirmation
                            ?.message
                    }
                />

                <Button
                    disabled={
                        isLoading ||
                        !isValid ||
                        isCheckingUsername ||
                        usernameAvailability === false
                    }
                    type="submit"
                    className="w-fit mx-auto mt-2"
                    variant="outline-primary"
                    size="sm"
                    leftIcon={
                        <ArrowLeftIcon className="size-4" />
                    }
                >
                    <Typography
                        variant="caption"
                    >
                        ثبت نام
                    </Typography>
                </Button>
            </div>
        </form>
    )
}