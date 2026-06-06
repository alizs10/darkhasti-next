"use client"

import { TrashIcon } from 'lucide-react'
import { MouseEvent, useMemo, useState } from 'react'
import { Button, ButtonVariant } from './Button';
import Dialog from '../dialogs/Dialog';
import { useRouter } from 'next/navigation';
import { deleteRequestReq } from '@/app/actions/request';
import { toast } from 'sonner';

interface DeleteRequestDetailsButtonProps {
    request_id: string | number
    title: string
    back_url: string
}

export default function DeleteRequestDetailsButton({ request_id, title, back_url }: DeleteRequestDetailsButtonProps) {

    const router = useRouter()

    const [dialogOpen, setDialogOpen] = useState(false)

    const dialog = useMemo(() => ({
        title: "حذف درخواست",
        desc: `درخواست "${title}" حذف شود؟`,
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
                }
            },
            cancel: {
                content: "انصراف",
                onCancel: () => setDialogOpen(false)
            },
        }
    }), [title])


    function handleClick(e: MouseEvent<HTMLButtonElement>) {

        e.preventDefault()
        e.stopPropagation()

        setDialogOpen(true)

    }

    async function handleDelete() {

        const res = await deleteRequestReq(request_id)
        if (!res.error) {
            toast.error("خطا در حذف درخواست. دوباره تلاش کنید.")
            return
        }
        toast.success("درخواست شما حذف شد")

        router.replace(back_url)

    }


    return (
        <>
            <Button variant='ghost-destructive' size='icon-xs' onClick={handleClick} type='button'
            >
                <TrashIcon className="size-3" />
            </Button>

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
