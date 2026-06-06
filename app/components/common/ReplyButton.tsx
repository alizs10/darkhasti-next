'use client'

import { useAuthRequired } from '@/app/context/AuthRequiredContext';
import { ReplyIcon } from 'lucide-react'
import { Button } from './Button';
import { Typography } from './Typography';
import { MouseEvent } from 'react';

interface ReplyButtonProps {
    auth_required: boolean;
    id: string | number;
    type: "request" | "comment"
}

export default function ReplyButton({ auth_required, type, id }: ReplyButtonProps) {

    const { showAuthModal } = useAuthRequired();


    function handleClick(e: MouseEvent<HTMLButtonElement>) {

        e.stopPropagation()
        e.preventDefault()

        if (auth_required) {
            showAuthModal(`/${type === 'request' ? 'requests' : 'comment'}/${id}`)
            return
        }

        // Search for #new-comment and scroll it into view
        const newCommentElement = document.getElementById('new-comment');

        if (newCommentElement) {
            newCommentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Optional: Add focus to the comment input if it exists
            const commentInput = newCommentElement.querySelector('input, textarea');
            if (commentInput) {
                setTimeout(() => {
                    (commentInput as HTMLElement).focus();
                }, 500); // Slight delay to allow scroll to complete
            }
        }
    }


    return (
        <Button variant="ghost" size='sm' onClick={handleClick}
            className='px-2! py-0.5!'
            rightIcon={<ReplyIcon className='size-3.5' />}>
            <Typography

                variant="caption-xs"
            >
                پاسخ
            </Typography>
        </Button>
    )
}
