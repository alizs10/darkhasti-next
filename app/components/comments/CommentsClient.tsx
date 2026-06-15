"use client"

import { ApiResponse, Comment, CommentOrder, PaginationData } from '@/app/types';
import CommentsList from './CommentsList';
import { LoadMoreButton } from './LoadMoreButton';
import NewComment from './NewComment';
import { CommentsProvider } from '@/app/context/CommentsContext';
import { Session } from 'next-auth';
import CommentsTopBar from './CommentsTopBar';
import { AttachedFilesProvider } from '@/app/context/AttachedFilesContext';
import CommentItemSkeleton from '../skeletons/CommentItemSkeleton';
import { requestCommentsReq } from '@/app/actions/request';
import { commentRepliesReq } from '@/app/actions/comment';

async function loadMoreComments(
    id: number | string,
    type: 'comment' | 'request',
    order: CommentOrder,
    cursor: string,
): Promise<{ data: Comment[]; pagination: PaginationData }> {

    let result;

    if (type === 'request') {

        result = await requestCommentsReq({
            request_id: id,
            order,
            cursor
        })

    }

    if (type === 'comment') {

        result = await commentRepliesReq({
            comment_id: id,
            order,
            cursor
        })
    }
    const data = result?.data;

    console.log(result)

    if (!data) {
        throw new Error('Failed to load more comments');
    }

    return {
        data: data,
        pagination: result?.pagination as PaginationData
    };
}

interface CommentsClientProps {
    data: Comment[] | null;
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
    isLoading: boolean;
}

export default function CommentsClient({ pinned, data, order, request_id, request_author_id, pagination, commentable, commentable_id, user, canReply, isLoading }: CommentsClientProps) {

    // const session = await auth()

    const filteredComments = data ? (pinned ? data?.filter(c => c.id !== pinned.id) : [...data]) : null


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

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto py-10 flex flex-col">

                <div className="mt-8">
                    <CommentsTopBar />


                    {!isLoading ? (
                        <CommentsList
                            // pinned={pinned}
                            user={user}
                            commentable={commentable}
                            commentable_id={commentable_id}
                        />
                    ) : (
                        <div className="mt-4 grid grid-cols-1 gap-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <CommentItemSkeleton key={i} />
                            ))}
                        </div>

                    )}

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
