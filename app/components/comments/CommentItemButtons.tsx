'use client'


import { handleVote } from '@/app/actions/vote';
import { useAuthRequired } from '@/app/context/AuthRequiredContext';
import { MessagesSquareIcon, ReplyIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import React, { MouseEvent, useState } from 'react'
import { toast } from 'sonner';
import ReplyButton from '../common/ReplyButton';
import { Typography } from '../common/Typography';
import { Button } from '../common/Button';

interface CommentItemButtonsProps {
    user_vote?: null | "like" | "dislike";
    comment_id: string | number;
    commentable_id: string | number;
    commentable: "comment" | "request";
    likes_count: number;
    dislikes_count: number;
    replies_count: number;
    auth_required: boolean;
}

export default function CommentItemButtons({ user_vote, comment_id, commentable_id, commentable, auth_required, likes_count, dislikes_count, replies_count }: CommentItemButtonsProps) {

    const { showAuthModal } = useAuthRequired();


    const [userVote, setUserVote] = useState(user_vote ?? null)
    const [votes, setVotes] = useState({
        likes: likes_count ?? 0,
        dislikes: dislikes_count ?? 0,
    })

    const [disabledType, setDisabledType] = useState<null | "like" | "dislike">(null)

    async function voteHandler(type: "like" | "dislike") {
        if (auth_required) {
            const backUrl = `/${commentable}/${commentable_id}`
            showAuthModal(backUrl);
            return;
        }

        setDisabledType(type)

        try {

            const res = await handleVote({
                id: comment_id,
                type: "comment",
                vote: type
            })

            const data = res?.data


            setTimeout(() => {
                setUserVote(data?.current_vote ?? null)
                setVotes(prev => ({
                    likes: data?.likes ?? prev.likes,
                    dislikes: data?.dislikes ?? prev.dislikes,
                }))

                setDisabledType(null)
                toast(data?.message)
            }, 1000)

        } catch (error) {
            toast('Something went wrong!')
        }

    }

    async function onVote(e: MouseEvent<HTMLButtonElement>, type: "like" | "dislike") {

        e.preventDefault()
        e.stopPropagation()

        await voteHandler(type)
    }


    return (
        <div className="flex-center-between gap-x-4 mt-4">

            <ReplyButton id={comment_id} auth_required={auth_required} type='comment' />



            <div className="flex-row-center gap-x-0">

                <div className="rounded-full text-muted-foreground flex-row-center  py-0.5 px-1.5 gap-x-1.5">
                    <MessagesSquareIcon className='size-3.5' />
                    <Typography
                        variant="caption-xs"
                    >
                        {replies_count}
                    </Typography>
                </div>

                <Button
                    variant='ghost'
                    rightIcon={<ThumbsUpIcon className='size-3.5' />}
                    disabled={disabledType === "like"}
                    onClick={(e) => onVote(e, 'like')} className={` py-0.5! px-1.5! ${userVote === 'like' ? 'text-success' : 'text-foreground'}`}>
                    <Typography
                        variant="caption-xs"
                    >
                        {votes.likes}
                    </Typography>
                </Button>
                <Button
                    variant='ghost'
                    rightIcon={<ThumbsDownIcon className='size-3.5' />}
                    disabled={disabledType === "dislike"}
                    onClick={(e) => onVote(e, 'dislike')} className={`py-0.5! px-1.5! ${userVote === 'dislike' ? 'text-destructive' : 'text-foreground'}`}>


                    <Typography
                        variant="caption-xs"
                    >
                        {votes.dislikes}
                    </Typography>
                </Button>


            </div>
        </div>
    )
}
