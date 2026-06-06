"use client"

import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import { MouseEvent, useState } from 'react';
import { toast } from 'sonner';
import { handleVote } from '@/app/actions/vote';
import { useAuthRequired } from '@/app/context/AuthRequiredContext';
import { Button } from '../common/Button';
import { Typography } from '../common/Typography';

interface CommentDetailsButtonsProps {
    user_vote?: null | "like" | "dislike";
    comment_id: string | number;
    likes_count: number;
    dislikes_count: number;
    replies_count: number;
    auth_required: boolean;
}

export default function CommentDetailsButtons({ user_vote, comment_id, auth_required, likes_count, dislikes_count, replies_count }: CommentDetailsButtonsProps) {

    const [userVote, setUserVote] = useState(user_vote ?? null)
    const [votes, setVotes] = useState({
        likes: likes_count ?? 0,
        dislikes: dislikes_count ?? 0,
    })

    const { showAuthModal } = useAuthRequired();



    const [disabledType, setDisabledType] = useState<null | "like" | "dislike">(null)


    async function voteHandler(e: MouseEvent<HTMLButtonElement>, type: "like" | "dislike") {

        e.stopPropagation()
        e.preventDefault()

        if (auth_required) {
            showAuthModal(`/comment/${comment_id}`);
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

            console.log(data)

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

    return (
        <div className="flex-row-center gap-x-4">
            <div className="flex-row-center gap-x-0">
                <Button variant='ghost' size="sm" className='px-2! py-0.5!' onClick={(e) => voteHandler(e, "like")}
                    disabled={disabledType === 'like'}
                    rightIcon={<ThumbsUpIcon className='size-3.5' />}
                >
                    <Typography
                        variant="caption-xs"
                    >
                        {votes.likes}
                    </Typography>

                </Button>
                <Button variant='ghost' size="sm" className='px-2! py-0.5!' onClick={(e) => voteHandler(e, "dislike")}
                    disabled={disabledType === 'dislike'}
                    rightIcon={<ThumbsDownIcon className='size-3.5' />}
                >
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
