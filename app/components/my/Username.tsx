"use client"

import { UserPenIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "../common/Button"
import { Typography } from "../common/Typography"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changeUsernameSchema } from "@/app/schemas/auth"
import TextInput from "../Form/TextInput"
import z from "zod"
import { toast } from "sonner"
import { changeUsernameReq } from "@/app/actions/profile"
import { logoutHandler } from "./Logout"
import { checkUsernameReq } from "@/app/actions/auth"
import { useDebounce } from "@/app/hooks/useDebounce"
import clsx from "clsx"

type ChangeUsernameFormValues = z.infer<
    typeof changeUsernameSchema
>

export default function Username({ current_username }: { current_username?: string }) {
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
    } = useForm<ChangeUsernameFormValues>({
        resolver: zodResolver(
            changeUsernameSchema
        ),
        mode: 'onChange',
        defaultValues: {
            username: current_username,
        },
    })

    const username = watch('username')
    const debouncedUsernameTerm =
        useDebounce(username, 1000)

    useEffect(() => {
        if (
            !debouncedUsernameTerm ||
            debouncedUsernameTerm.trim().length < 3 ||
            debouncedUsernameTerm === current_username
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
        current_username,
    ])

    const onSubmit = async (
        data: ChangeUsernameFormValues
    ) => {
        if (isLoading || !usernameAvailability) return

        setIsLoading(true)

        const res = await changeUsernameReq({
            username: data.username
        })

        if (!res.data) {
            toast.error(
                res.error?.message
            )

            setIsLoading(false)
            return
        }

        toast.success(
            'تغییر نام کاربری با موفقیت انجام شد. لطفا دوباره وارد شوید.'
        )

        setTimeout(async () => {

            await logoutHandler()

        }, 1000)

    }

    return (
        <form onSubmit={handleSubmit(
            onSubmit
        )}
        >

            <div className="mt-8 flex flex-col gap-y-2">
                <Typography variant="body" weight="medium" className="border-b border-muted pb-2">
                    نام کاربری
                </Typography>
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

                <Button
                    disabled={
                        isLoading ||
                        !isValid ||
                        isCheckingUsername ||
                        usernameAvailability === false
                    }
                    type='submit'
                    className=""
                    variant="outline-primary"
                    size="sm"
                    rightIcon={<UserPenIcon className="size-4" />}
                >
                    <span>تغییر نام کاربری</span>
                </Button>
            </div>
        </form>
    )
}
