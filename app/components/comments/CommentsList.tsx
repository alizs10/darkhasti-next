"use client"

import { useComments } from '@/app/context/CommentsContext';
import CommentItem from './CommentItem';
import { Comment, User } from '@/app/types';
import { Session } from 'next-auth';
import { AuthRequiredProvider } from '@/app/context/AuthRequiredContext';
import { Typography } from '../common/Typography';

interface CommentsListProps {
    pinned?: Comment | null;
    user?: Partial<Session>['user']
    commentable_id: string | number;
    commentable: "comment" | "request";
}

export default function CommentsList({ commentable, commentable_id, pinned, user }: CommentsListProps) {
    const { chosenAnswer, comments } = useComments();
    // const session = useSession()
    // const user = session?.data?.user;

    // Filter out pinned comment from the main list if it exists
    // const filteredComments = pinned
    //     ? comments.filter(comment => comment.id !== pinned.id)
    //     : comments;

    return (
        <AuthRequiredProvider>
            <div className="mt-4 grid grid-cols-1 gap-4">
                {chosenAnswer && (
                    <CommentItem
                        key={chosenAnswer.id}
                        comment={{ ...chosenAnswer, editable: chosenAnswer?.author?.id.toString() === user?.id?.toString() }}
                        user={user}
                        commentable={commentable}
                        commentable_id={commentable_id}
                        isOwner={Number(chosenAnswer.author_id) === Number(user?.id)}

                    />
                )}

                {comments.map((comment, i) => (
                    <CommentItem
                        key={comment.id || i}
                        comment={{ ...comment, editable: comment?.author?.id.toString() === user?.id?.toString() }}
                        user={user}
                        commentable={commentable}
                        commentable_id={commentable_id}
                        isOwner={Number(user?.id) === comment.author_id}
                    />
                ))}

            </div>
            {comments.length === 0 && !pinned && (
                <div className="flex-center mx-auto w-fit pt-6 pb-10">

                    <Typography
                        className='text-foreground'
                        variant="body-sm"
                    >
                        بدون پاسخ
                    </Typography>
                </div>
            )}
        </AuthRequiredProvider>
    );
}