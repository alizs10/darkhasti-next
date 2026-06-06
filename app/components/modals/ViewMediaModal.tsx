import { MouseEvent } from 'react'
import ModalWrapper from '../layout/ModalWrapper'
import { AttachedFile } from '@/app/types';
import { DownloadIcon, XIcon } from 'lucide-react';
import { downloadFile } from '@/app/helpers';
import { Typography } from '../common/Typography';
import { Button } from '../common/Button';

interface ViewMediaModalProps {
    open: boolean;
    onClose: () => void;
    mediaFile: AttachedFile
}

export default function ViewMediaModal({ open, onClose, mediaFile }: ViewMediaModalProps) {

    function stopPropagation(e: MouseEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
    }

    function handleDownload() {
        downloadFile(mediaFile)
    }

    return (
        <ModalWrapper open={open} onClose={onClose}>
            <div onClick={stopPropagation} className="shadow-sm p-5 rounded-3xl bg-background flex flex-col w-full max-w-4/5 sm:max-w-md max-h-[80vh] overflow-y-scroll">

                <Button variant='ghost' size="icon" onClick={onClose} className="ml-auto">
                    <XIcon className="size-4" />
                </Button>


                <img src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${mediaFile.file_path}`} className='mt-2 w-full h-auto group-hover:hidden transition-all duration-200 object-cover' />


                <Button
                    variant='outline-primary'
                    onClick={handleDownload}
                    className="mt-6 mx-auto"
                    rightIcon={<DownloadIcon className="size-4" />}
                >
                    <Typography
                        variant="caption"
                    >
                        دانلود فایل
                    </Typography>

                </Button>

            </div>

        </ModalWrapper>
    )
}
