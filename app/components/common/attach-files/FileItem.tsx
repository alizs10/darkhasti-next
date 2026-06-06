"use client"

import { downloadFile, formatFileSize, getFileNameAndExt, isMediaCheck } from '@/app/helpers';
import { AttachedFile } from '@/app/types';
import { ExpandIcon, FileDownIcon, FileIcon, GalleryVerticalIcon, ImageIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import ViewMediaModal from '../../modals/ViewMediaModal';
import { Typography } from '../Typography';

interface FileItemProps {
    file: AttachedFile;
    theme?: "default" | "lighter"
}

export default function FileItem({ file, theme = "default" }: FileItemProps) {

    const [mediaModalOpen, setMediaModalOpen] = useState(false)
    const { ext, name } = useMemo(() => getFileNameAndExt(file.file_name, 10), [file.file_name])

    function toggleMediaModal() {
        setMediaModalOpen(prev => !prev)
    }

    const fileSize = useMemo(() => {
        if (file.uploading && file.uploaded_bytes !== undefined) {
            return `${formatFileSize(file.uploaded_bytes)} / ${formatFileSize(file.file_size)}`
        }
        return formatFileSize(file.file_size)
    }, [file.uploading, file.uploaded_bytes, file.file_size])

    const isMedia = useMemo(() => isMediaCheck(file.mime_type), [file.mime_type])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (isMedia) {
            setMediaModalOpen(true)
            return
        }


        downloadFile(file)
    };





    return (
        <>
            <button
                type='button'
                onClick={handleClick}
                className={`group py-1.5 px-4 ${theme === 'lighter' ? 'bg-muted' : 'bg-background'} rounded-xl flex flex-row items-center gap-x-3 transition-all duration-200`}>

                <div className={`${theme === 'lighter' ? '' : ''} rounded-full flex-center transition-all duration-200`}>
                    {isMedia === "image" ? (
                        <>
                            <ImageIcon className='size-5 lg:size-6 group-hover:hidden transition-all duration-200' />

                            <ExpandIcon className='size-5 lg:size-6 hidden group-hover:block text-success transition-all duration-200' />
                        </>

                    ) : (
                        <>
                            <FileIcon className='size-5 lg:size-6 group-hover:hidden transition-all duration-200' />
                            <FileDownIcon className='size-5 lg:size-6 hidden group-hover:block text-success transition-all duration-200' />
                        </>
                    )}

                </div>

                <div className="flex flex-col">
                    <Typography
                        className='text-start font-sans'
                        variant="caption-xs"
                    >
                        {`${name}.${ext}`}
                    </Typography>
                    <Typography
                        className='dir-ltr text-end font-sans text-muted-foreground'
                        variant="caption-xs"
                    >
                        {fileSize}
                    </Typography>
                </div>
            </button>

            {mediaModalOpen && <ViewMediaModal mediaFile={file} onClose={toggleMediaModal} open={mediaModalOpen} />}
        </>

    )
}
