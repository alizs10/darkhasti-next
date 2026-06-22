"use client"

import { getComments } from '@/app/actions/comment';
import { Comment, CommentOrder, PaginationData } from '@/app/types';
import CommentsClient from './CommentsClient';
import { auth } from '@/app/lib/auth';
import { useSearchParams } from 'next/navigation';
import { COMMENT_ORDERS } from '@/app/constants/orders';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

interface CommentsProps {
    // order: CommentOrder;
    count: number;
    commentable: "request" | "comment";
    commentable_id: string | number;
    pinned?: Comment | null;
    canReply?: boolean;
    request_id: string | number;
    request_author_id: string | number;
    user?: Partial<Session>['user']
}

export default function Comments({ commentable, commentable_id, count, pinned, canReply, request_id, request_author_id, user }: CommentsProps) {

    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(true)
    const [commentsData, setCommentsData] = useState<Comment[] | null>(null)
    const [paginationData, setPaginationData] = useState<PaginationData | undefined>(undefined)

    // 1. Use const instead of let, as we don't need to mutate this variable
    const orderParam = searchParams.get("comment_order") ?? "new";

    // 2. Cast the array to readonly string[] so .includes() accepts the generic string
    const isValidOrder = (COMMENT_ORDERS as readonly string[]).includes(orderParam);

    // 3. Cast the final result to CommentOrder so TypeScript accepts the assignment
    const order: CommentOrder = isValidOrder ? (orderParam as CommentOrder) : "new" as CommentOrder;

    useEffect(() => {

        const fetchData = async () => {

            setIsLoading(true)
            const result = await getComments(commentable_id, commentable, order)

            const data = result?.data;
            const pagination = result?.pagination;

            console.log(data, pagination, result)

            if (!data) return

            setCommentsData(data)
            setPaginationData(pagination)
            setIsLoading(false)
        }


        console.log(order)

        console.log("are we here???: ", order)

        if (!order) return
        fetchData()
    }, [order])


    // if (!commentsData?.success) {
    //     return null;
    // }

    // const { data, pagination } = commentsData;

    // if (!data) {
    //     return null;
    // }

    // return null;

    return (
        <CommentsClient

            commentable={commentable}
            commentable_id={commentable_id}
            // count={count}
            data={commentsData}
            order={order}
            pagination={paginationData}
            request_id={request_id}
            request_author_id={request_author_id}
            user={user}
            // session={session}
            canReply={canReply}
            pinned={pinned}
            isLoading={isLoading}
        />

    )
}
