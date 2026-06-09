import { MessageCircleCheckIcon, MessagesSquareIcon, SaveIcon, ThumbsUpIcon, TrendingUpIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import momentFa from "@/app/lib/moment"
import EditButton from '../common/EditButton';
import { Request } from '@/app/types';
import { Typography } from '../common/Typography';
import DeleteRequestButton from '../common/DeleteRequestButton';
import DeleteRequestDetailsButton from '../common/DeleteRequestDetailsButton';
import { useMemo } from 'react';


interface RequestItemProps {
    request: Request;
    isInContext?: boolean;
    isOwner?: boolean;
    back_url?: string;
}

export default function RequestItem({ request, isOwner = false, isInContext = false, back_url }: RequestItemProps) {

    const href = useMemo(() => {

        let url = `/requests/${request.id}`

        if (back_url) {
            url += `?back_url=${back_url}`
        }

        return url

    }, [back_url])



    return (
        <Link href={href} className="col-span-1 h-68 flex flex-col bg-secondary rounded-2xl p-4">

            <div className="flex justify-between items-start">

                <div className="flex-row-center gap-x-2">


                    <div className="size-10 rounded-full bg-muted flex-center">
                        <User2Icon className='size-6 text-muted-foreground' />
                    </div>


                    <div className="flex flex-col">

                        <Typography
                            variant="caption"
                            weight='medium'
                        >
                            {request.author?.username}
                        </Typography>
                        <Typography
                            className='text-muted-foreground'
                            variant="caption-xs"
                        >
                            {momentFa(new Date(request.published_at ?? request.created_at)).fromNow()}
                        </Typography>

                    </div>


                </div>


                <div className="flex-row-center gap-x-3">




                    {request.is_answered && (
                        <div className="flex-row-center gap-x-1 text-success">
                            <MessageCircleCheckIcon className="size-3" />
                            <Typography
                                className='text-success'
                                variant="caption-xs"
                            >
                                پاسخ داده شده
                            </Typography>
                        </div>
                    )}
                    {request.published_at === null && (
                        <div className="flex-row-center gap-x-1 text-warning">
                            <SaveIcon className="size-3" />
                            <Typography
                                className='text-warning'
                                variant="caption-xs"
                            >
                                پیش نویس
                            </Typography>
                        </div>
                    )}

                    {isOwner && (
                        <>
                            {isInContext ? (<DeleteRequestButton request_id={request.id} title={request.title} />) : (
                                <DeleteRequestDetailsButton request_id={request.id} title={request.title} back_url={"/my/requests"} />
                            )}
                            <EditButton url={`/my/requests/${request.id}`} />
                        </>
                    )}
                </div>
            </div>



            <Typography
                className='mt-4 line-clamp-2'
                variant="label"
                weight='semibold'
            >
                {request.title}
            </Typography>

            <Typography
                className='mt-4 mb-8 text-justify line-clamp-3 text-ellipsis'
                variant="body-sm"
            >
                {request.description}
            </Typography>


            <div className="mt-auto mr-auto">
                <div className="mt-auto rounded-full flex flex-wrap items-center gap-3">


                    <div className="flex-row-center gap-x-1 text-foreground">
                        <ThumbsUpIcon className="size-3" />
                        <Typography
                            className=''
                            variant="caption-xs"
                        >
                            {request.likes_count}
                        </Typography>
                    </div>
                    <div className="flex-row-center gap-x-1 text-foreground">
                        <MessagesSquareIcon className="size-3" />
                        <Typography
                            className=''
                            variant="caption-xs"
                        >
                            {request.replies_count}
                        </Typography>
                    </div>
                    <div className="flex-row-center gap-x-1 text-foreground">
                        <TrendingUpIcon className="size-3" />
                        <Typography
                            variant="caption-xs"
                        >
                            {request.visits_count}
                        </Typography>
                    </div>

                </div>
            </div>
        </Link>
    )
}
