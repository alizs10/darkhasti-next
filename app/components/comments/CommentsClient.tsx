"use client"

import { ApiResponse, Comment, CommentOrder, PaginationData } from '@/app/types';
import CommentsList from './CommentsList';
import { LoadMoreButton } from './LoadMoreButton';
import NewComment from './NewComment';
import { CommentsProvider } from '@/app/context/CommentsContext';
import axiosClient from '@/app/lib/axios-client';
import { Session } from 'next-auth';
import CommentsTopBar from './CommentsTopBar';
import { AttachedFilesProvider } from '@/app/context/AttachedFilesContext';

async function loadMoreComments(
    id: number | string,
    type: 'comment' | 'request',
    order: CommentOrder,
    cursor: string,
): Promise<{ data: Comment[]; pagination: PaginationData }> {

    const url = type === 'request'
        ? `/requests/${id}/comments?order=${order}&cursor=${cursor}`
        : `/comments/${id}/replies?order=${order}&cursor=${cursor}`;

    const result = await axiosClient.get<ApiResponse<Comment[]>>(url);

    const data = result.data;

    console.log(result)

    if (!data.success || !data.data) {
        throw new Error('Failed to load more comments');
    }

    return {
        data: data.data,
        pagination: data.meta as PaginationData
    };
}

interface CommentsClientProps {
    data: Comment[];
    order: CommentOrder;
    // count: number;
    commentable: "request" | "comment";
    commentable_id: string | number;
    pinned?: Comment | null;
    canReply?: boolean;
    request_id: string | number;
    request_author_id: string | number;
    pagination?: PaginationData;
    user?: Partial<Session>['user']
}

export default function CommentsClient({ pinned, data, order, request_id, request_author_id, pagination, commentable, commentable_id, user, canReply }: CommentsClientProps) {

    // const session = await auth()

    const filteredComments = pinned ? data?.filter(c => c.id !== pinned.id) : [...data]


    return (
        <CommentsProvider
            commentOrder={order}
            init_data={filteredComments}
            init_chosen_answer={pinned ?? null}
            request_id={request_id}
            request_author_id={request_author_id}
            initialPagination={pagination}
            onLoadMore={(cursor, direction) => loadMoreComments(commentable_id, commentable, order, cursor)}
        >

            <div className="flex flex-col pb-10 z-10 bg-background/20 backdrop-blur-sm">

                <div className="mt-8">
                    <CommentsTopBar />


                    <CommentsList
                        // pinned={pinned}
                        user={user}
                        commentable={commentable}
                        commentable_id={commentable_id}
                    />


                    <div className="flex-1 flex-center">
                        <LoadMoreButton />
                    </div>

                </div>

                {canReply && (
                    <AttachedFilesProvider attachable_type='App\Models\Comment'>
                        <NewComment type={commentable} parent_id={commentable === 'comment' ? commentable_id : undefined} />
                    </AttachedFilesProvider>
                )}
            </div>
        </CommentsProvider>
    )
}
