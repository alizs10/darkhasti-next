"use client"

import { TrashIcon } from 'lucide-react'
import { MouseEvent, useMemo, useState } from 'react'
import { Button, ButtonVariant } from './Button';
import Dialog from '../dialogs/Dialog';
import { useComments } from '@/app/context/CommentsContext';

interface DeleteButtonProps {
    comment_id: string | number
    title: string
}

export default function DeleteCommentButton({ comment_id, title }: DeleteButtonProps) {

    const [dialogOpen, setDialogOpen] = useState(false)
    const { hardDeleteComment } = useComments()

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

    function handleDelete() {

        hardDeleteComment(comment_id)
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
