import { Comment } from '@/app/types';
import { Session } from 'next-auth';
import CommentItem from '../CommentItem';
import Link from 'next/link';
import { MessageCircleCheckIcon, User2Icon } from 'lucide-react';
import { Typography } from '../../common/Typography';
import momentFa from '@/app/lib/moment';
import DeleteCommentDetailsButton from '../../common/DeleteCommentDetailsButton';
import EditButton from '../../common/EditButton';
import AttachedFiles from '../../common/attach-files/AttachedFiles';
import CommentItemButtons from '../CommentItemButtons';

interface AncestorsCommentProps {
    comment: Comment;
    user: Partial<Session>['user']
}

export default function AncestorsComment({ comment, user }: AncestorsCommentProps) {
    return (

        <div className="relative mt-8">

            <Link href={`/comment/${comment.id}`} className='flex flex-col rounded-2xl bg-secondary p-4'>



                <div className="flex justify-between items-start">

                    <div className="flex-row-center gap-x-2">


                        <div className="size-10 rounded-full bg-secondary flex-center">
                            <User2Icon className='size-6 text-muted-foreground' />
                        </div>


                        <div className="flex flex-col">



                            <Typography
                                variant="caption"
                                weight='medium'
                            >
                                {comment.author?.username}
                            </Typography>

                            <div className="flex-row-center gap-x-3">


                                <Typography
                                    className='text-muted-foreground'
                                    variant="caption-xs"
                                >
                                    {momentFa(new Date(comment.created_at)).fromNow()}
                                </Typography>

                            </div>
                        </div>


                    </div>


                    <div className="flex-row-center gap-x-3">




                        {comment.is_chosen_answer && (
                            <div className="flex-row-center gap-x-1 text-success">
                                <MessageCircleCheckIcon className="size-3" />

                                <Typography
                                    className='text-success'
                                    variant="caption-xs"
                                >
                                    پاسخ برگزیده
                                </Typography>
                            </div>
                        )}

                        {Number(user?.id) === comment.author_id && (
                            <>
                                <DeleteCommentDetailsButton comment_id={comment.id} title={comment.body} back_url={comment.parent_id ? `/comment/${comment.parent_id}` : `/requests/${comment.request_id}`} />
                                <EditButton url={`/my/comments/${comment.id}`} />
                            </>
                        )}
                    </div>

                </div>
                <Typography
                    className='mt-4 mb-8 text-justify line-clamp-3 text-ellipsis'
                    variant="body-sm"
                >
                    {comment.body}
                </Typography>

                {comment?.attached_files?.length > 0 ? (<AttachedFiles theme='default' files={comment.attached_files} />) : null}


                <CommentItemButtons
                    commentable={"comment"}
                    commentable_id={comment.id}
                    comment_id={comment.id} auth_required={!user} dislikes_count={comment.dislikes_count} likes_count={comment.likes_count}
                    replies_count={comment.replies_count}
                    user_vote={comment.user_vote_status}
                />




            </Link>

            <div className="absolute h-8 w-0.5 bg-secondary top-full right-8" />


        </div>


    )
}