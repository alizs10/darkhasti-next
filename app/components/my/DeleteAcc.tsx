'use client'

import { TrashIcon } from 'lucide-react'
import { ChangeEvent, useMemo, useState } from 'react'
import { Button, ButtonVariant } from '../common/Button'
import { Typography } from '../common/Typography'
import { deleteAccountReq } from '@/app/actions/profile'
import { toast } from 'sonner'
import { signOut } from "next-auth/react"
import Dialog from '../dialogs/Dialog'

export default function DeleteAcc() {
    const [isLoading, setIsLoading] =
        useState(false)

    const [password, setPassword] = useState("")

    function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    const [dialogOpen, setDialogOpen] = useState(false)

    const dialog = useMemo(() => ({
        title: "حذف حساب کاربری",
        desc: `آیا از حذف حساب کاربری خود اطمینان دارید؟ تمام اطلاعات شما حذف خواهد شد و قابل بازیابی نمی باشد.`,
        open: dialogOpen,
        onClose: () => setDialogOpen(false),
        buttons: {
            confirm: {
                content: "حذف",
                icon: <TrashIcon className="size-4" />,
                variant: "destructive" as ButtonVariant,
                onConfirm: async () => {
                    await handleDelete()
                    setDialogOpen(false)
                },
                confirmInput: {
                    label: "کلمه عبور خود را وارد کنید",
                    value: password,
                    onChange: onPasswordChange
                }
            },
            cancel: {
                content: "انصراف",
                onCancel: () => setDialogOpen(false)
            },
        }
    }), [password])


    async function handleDelete() {

        if (isLoading || password.trim().length === 0) return;


        setIsLoading(true)
        const res = await deleteAccountReq({ password })

        if (!res.success) {

            const errorMsg = res.error?.message ?? "خطا در حذف حساب کاربری. دوباره تلاش کنید."

            toast.error(errorMsg)
            setPassword("")
            setIsLoading(false)
            return
        }

        toast.success("حساب کاربری شما با موفقیت حذف شد.")

        setTimeout(async () => {

            setIsLoading(false)
            await signOut()

        }, 1000)

    }

    return (
        <>



            <div className="mt-8 flex flex-col gap-y-2">

                <Typography variant="body" weight="medium" className="border-b border-muted pb-2">
                    حذف حساب کاربری
                </Typography>
                <Typography variant="caption-xs" className="text-muted-foreground text-justify">
                    با حذف حساب کاربری تمامی اطلاعات شما(درخواست‌ها، پاسخ ها) از بین خواهد رفت و قابل برگشت نخواهد بود.
                </Typography>

                <Button
                    disabled={isLoading}
                    type='submit'
                    className=""
                    variant="destructive"
                    size="sm"
                    rightIcon={<TrashIcon className="size-4" />}
                    onClick={() => setDialogOpen(true)}
                >
                    <Typography variant="caption-xs" weight="medium">
                        حذف حساب کاربری
                    </Typography>
                </Button>



            </div>

            {dialogOpen && (
                <Dialog
                    title={dialog.title}
                    desc={dialog.desc}
                    open={dialog.open}
                    onClose={dialog.onClose}
                    buttons={dialog.buttons}
                />
            )}
        </>
    )
}
