"use client"

import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import { MouseEvent, useState } from 'react';
import { toast } from 'sonner';
import { handleVote } from '@/app/actions/vote';
import { useAuthRequired } from '@/app/context/AuthRequiredContext';
import { Button } from '../common/Button';
import { Typography } from '../common/Typography';

interface RequestDetailsButtonsProps {
    user_vote?: null | "like" | "dislike";
    request_id: string | number;
    likes_count: number;
    dislikes_count: number;
    replies_count: number;
    auth_required: boolean;
}

export default function RequestDetailsButtons({ user_vote, request_id, auth_required, likes_count, dislikes_count, replies_count }: RequestDetailsButtonsProps) {

    const [userVote, setUserVote] = useState(user_vote ?? null)
    const [votes, setVotes] = useState({
        likes: likes_count ?? 0,
        dislikes: dislikes_count ?? 0,
    })

    const { showAuthModal } = useAuthRequired();



    const [disabledType, setDisabledType] = useState<null | "like" | "dislike">(null)


    async function voteHandler(type: "like" | "dislike") {


        if (auth_required) {
            showAuthModal(`/requests/${request_id}`);
            return;
        }

        setDisabledType(type)


        const res = await handleVote({
            id: request_id,
            type: "request",
            vote: type
        })

        if (!res.success) {
            setDisabledType(null)
            toast.error(res.error?.message)
            return
        }


        const data = res?.data;


        setTimeout(() => {
            setUserVote(data?.current_vote ?? null)
            setVotes(prev => ({
                likes: data?.likes ?? prev.likes,
                dislikes: data?.dislikes ?? prev.dislikes,
            }))

            setDisabledType(null)
            toast(data?.message)
        }, 1000)



    }

    async function onVote(e: MouseEvent<HTMLButtonElement>, type: "like" | "dislike") {

        e.preventDefault()
        e.stopPropagation()

        await voteHandler(type)
    }

    return (
        <div className="flex-row-center gap-x-4">
            <div className="flex-row-center gap-x-0">
                <Button variant='ghost' size="sm" className={`px-2 h-auto py-1 ${userVote === 'like' ? 'text-success' : 'text-foreground'} disabled:bg-muted`}
                    onClick={(e) => onVote(e, 'like')}
                    disabled={disabledType === 'like'}
                    rightIcon={<ThumbsUpIcon className='size-3.5' />}
                >
                    <Typography
                        variant="caption-xs"
                    >
                        {votes.likes}
                    </Typography>

                </Button>
                <Button variant='ghost' size="sm" className={`px-2 h-auto py-1 ${userVote === 'dislike' ? 'text-destructive' : 'text-foreground'} disabled:bg-muted`}
                    onClick={(e) => onVote(e, 'dislike')}
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
