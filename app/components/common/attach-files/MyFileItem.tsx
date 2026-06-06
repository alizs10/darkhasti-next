"use client"

import { formatFileSize, getFileNameAndExt } from '@/app/helpers';
import { AttachedFile } from '@/app/types';
import { FileIcon, TrashIcon, XIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import Dialog from '../../dialogs/Dialog';
import { useAttachedFiles } from '@/app/context/AttachedFilesContext';
import { Typography } from '../Typography';
import { ButtonVariant } from '../Button';

interface MyFileItemProps {
    file: AttachedFile;
}

export default function MyFileItem({ file }: MyFileItemProps) {

    const { removeFile, deletePermanentFile, restorePermanentFile } = useAttachedFiles()

    const [dialogOpen, setDialogOpen] = useState(false)

    const dialog = useMemo(() => ({
        title: "حذف فایل",
        desc: `فایل "${file.file_name}" حذف شود؟`,
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
    }), [file.file_name])

    const { ext, name } = useMemo(() => getFileNameAndExt(file.file_name, 10), [file.file_name])


    const fileSize = useMemo(() => {
        if (file.uploading && file.uploaded_bytes !== undefined) {
            return `${formatFileSize(file.uploaded_bytes)} / ${formatFileSize(file.file_size)}`
        }
        return formatFileSize(file.file_size)
    }, [file.uploading, file.uploaded_bytes, file.file_size])

    async function handleClick() {

        if (file?.status === 'deleted') {
            restorePermanentFile(Number(file.id))
            return
        }


        setDialogOpen(true)
    }

    async function handleDelete() {

        if (file.disk === 'temp') {
            await removeFile(file.id)
            return
        }




        deletePermanentFile(Number(file.id))

    }



    return (
        <>
            <button
                onClick={handleClick}
                type='button'
                disabled={file.uploading}
                className={`${file.uploading ? "" : "group"} py-1.5 px-4 bg-background rounded-xl flex flex-row items-center gap-x-3`}>

                <div className={`flex-center transition-all duration-200`}>
                    {file?.status === 'deleted' ? (<TrashIcon className='size-5 lg:size-6 group-hover:hidden text-destructive' />) : (
                        <FileIcon className={`size-5 lg:size-6 group-hover:hidden`} />
                    )}
                    {file?.status === 'deleted' ? (
                        <XIcon className='size-5 lg:size-6 hidden group-hover:block text-muted-foreground' />

                    ) : (
                        <TrashIcon className='size-5 lg:size-6 hidden group-hover:block text-destructive' />
                    )}
                </div>

                <div className="flex flex-col">
                    <Typography
                        className='text-start font-sans'
                        variant="caption-xs"
                    >
                        {`${name}.${ext}`}
                    </Typography>

                    <div className="flex-row-center gap-x-1">
                        <Typography
                            className='dir-ltr text-end font-sans text-muted-foreground'
                            variant="caption-xs"
                        >
                            {fileSize}
                        </Typography>
                        {file.disk === 'temp' && (
                            <Typography
                                className='px-1.5 py-0.5 bg-destructive/10 rounded-full text-destructive text-start'
                                variant="caption-xxs"
                            >
                                موقت
                            </Typography>
                        )}
                    </div>
                </div>

            </button>

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
