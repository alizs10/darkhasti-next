"use client"

import { TrashIcon } from 'lucide-react'
import { MouseEvent, useMemo, useState } from 'react'
import { Button, ButtonVariant } from './Button';
import Dialog from '../dialogs/Dialog';
import { deleteCommentReq } from '@/app/actions/comment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DeleteCommentDetailsButtonProps {
    comment_id: string | number
    title: string
    back_url: string
}

export default function DeleteCommentDetailsButton({ comment_id, title, back_url }: DeleteCommentDetailsButtonProps) {

    const router = useRouter()

    const [dialogOpen, setDialogOpen] = useState(false)

    const dialog = useMemo(() => ({
        title: "حذف پاسخ",
        desc: `پاسخ "${title.slice(0, 15)}" حذف شود؟`,
        open: dialogOpen,
        onClose: () => setDialogOpen(false),
        buttons: {
            confirm: {
                content: "حذف",
                icon: <TrashIcon className="size-4" />,
                variant: "destructive" as ButtonVariant,
                onConfirm: async () => {
                    handleDelete()
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

        const res = await deleteCommentReq(comment_id)
        if (!res.error) {
            toast.error("خطا در حذف پاسخ. دوباره تلاش کنید.")
            return
        }

        toast.success("پاسخ شما حذف شد")

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
