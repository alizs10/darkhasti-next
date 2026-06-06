'use client'

import { loginSchema } from '@/app/schemas/auth'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ArrowLeftIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import {
    useRouter,
    useSearchParams,
} from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import TextInput from '../Form/TextInput'
import PasswordInput from '../Form/PasswordInput'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'

type LoginFormValues = z.infer<
    typeof loginSchema
>

export default function LoginForm() {
    const searchParams = useSearchParams()
    const backUrl =
        searchParams.get('back_url')

    const router = useRouter()

    const [isLoading, setIsLoading] =
        useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(
            loginSchema
        ),
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (
        data: LoginFormValues
    ) => {
        if (isLoading) return

        setIsLoading(true)

        const result = await signIn(
            'credentials',
            {
                ...data,
                redirect: false,
                callbackUrl:
                    backUrl ?? '/',
            }
        )

        if (result?.error) {
            toast.error(
                'نام کاربری یا کلمه عبور اشتباه است'
            )

            setIsLoading(false)
            return
        }

        setIsLoading(false)

        router.replace(
            result?.url ||
            backUrl ||
            '/'
        )
    }

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
        >
            <div className="flex flex-col gap-y-2 w-80 mx-auto">
                <TextInput
                    {...register('username')}
                    placeholder="نام کاربری"
                    error={
                        errors.username
                            ?.message
                    }
                />

                <PasswordInput
                    {...register('password')}
                    placeholder="کلمه عبور"
                    error={
                        errors.password
                            ?.message
                    }
                />

                <Button
                    disabled={
                        isLoading ||
                        !isValid
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
                        ورود
                    </Typography>
                </Button>
            </div>
        </form>
    )
}