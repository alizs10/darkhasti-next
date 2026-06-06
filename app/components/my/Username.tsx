"use client"

import { UserPenIcon } from "lucide-react"
import { useState } from "react"
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

type ChangeUsernameFormValues = z.infer<
    typeof changeUsernameSchema
>

export default function Username({ current_username }: { current_username?: string }) {
    const [isLoading, setIsLoading] =
        useState(false)
    const {
        register,
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


    const onSubmit = async (
        data: ChangeUsernameFormValues
    ) => {
        if (isLoading) return

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
                <TextInput
                    {...register('username')}
                    placeholder="نام کاربری"
                    error={
                        errors.username
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
                    rightIcon={<UserPenIcon className="size-4" />}
                >
                    <span>تغییر نام کاربری</span>
                </Button>
            </div>
        </form>
    )
}
