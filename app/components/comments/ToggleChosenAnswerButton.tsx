"use client"

import { toggleChosenAnswer } from '@/app/actions/request';
import { useComments } from '@/app/context/CommentsContext';
import { MessageCircleCheck, MessageCircleXIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../common/Button';

interface ToggleChosenAnswerButtonProps {
    value: boolean;
    comment_id: string | number;
}

export default function ToggleChosenAnswerButton({ value, comment_id }: ToggleChosenAnswerButtonProps) {

    const { selectCommentAsAnswer } = useComments()

    const [isLoading, setIsLoading] = useState(false)

    async function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {

        e.preventDefault()
        e.stopPropagation();


        try {
            setIsLoading(true)
            const res = await toggleChosenAnswer(comment_id)

            const updatedComment = res?.data

            if (!updatedComment) {
                throw new Error("no updated comment")
            }

            selectCommentAsAnswer(updatedComment)


        } catch (error) {

        } finally {
            setIsLoading(false)
        }

    }


    return (

        <Button
            disabled={isLoading}
            onClick={handleToggle}
            variant='ghost-success'
            size='icon-xs'
        >
            {value ? (
                <MessageCircleXIcon className='size-3.5' />
            ) : (
                <MessageCircleCheck className='size-3.5' />
            )}
        </Button>
    )

}
