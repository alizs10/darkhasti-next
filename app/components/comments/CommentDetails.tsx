import { FileIcon, MessageCircleCheck, MessageCircleCheckIcon, MessagesSquareIcon, ReplyIcon, ThumbsDownIcon, ThumbsUpIcon, User2Icon, UserIcon } from 'lucide-react'
import { Comment, CommentOrder } from '@/app/types'
import Comments from './Comments'
import BackButton from '../common/BackButton'
import momentFa from '@/app/lib/moment'
import { AuthRequiredProvider } from '@/app/context/AuthRequiredContext'
import CommentDetailsButtons from './CommentDetailsButtons'
import ReplyButton from '../common/ReplyButton'
import { auth } from '@/app/lib/auth'
import Ancestors from './Ancestors/Ancestors'
import ReadComments from './ReadComments'
import AttachedFiles from '../common/attach-files/AttachedFiles'
import { Typography } from '../common/Typography'
import EditButton from '../common/EditButton'
import DeleteCommentButton from '../common/DeleteCommentButton'
import DeleteCommentDetailsButton from '../common/DeleteCommentDetailsButton'

interface CommentDetailsProps {
    order: CommentOrder
    data: Comment
}

export default async function CommentDetails({ order, data }: CommentDetailsProps) {

    const session = await auth()
    const auth_required = !session?.user

    return (
        <AuthRequiredProvider>

            <div className='flex flex-col flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto py-10'>

                <BackButton url={data.parent_id ? `/comment/${data.parent_id}` : `/requests/${data.request_id}`} />

                <div className="flex flex-col">

                    <Ancestors request={data?.request} ancestors={data.ancestors} user={session?.user} />


                    <div className="mt-8 w-full flex flex-col bg-secondary rounded-2xl p-4">


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
                                        {data.author?.username}
                                    </Typography>

                                    <div className="flex-row-center gap-x-3">


                                        <Typography
                                            className='text-muted-foreground'
                                            variant="caption-xs"
                                        >
                                            {momentFa(new Date(data.created_at)).fromNow()}
                                        </Typography>

                                    </div>
                                </div>


                            </div>


                            <div className="flex-row-center gap-x-3">




                                {data.is_chosen_answer && (
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

                                {data?.author_id === Number(session?.user.id) && (
                                    <>
                                        <DeleteCommentDetailsButton comment_id={data.id} title={data.body} back_url={data.parent_id ? `/comment/${data.parent_id}` : `/requests/${data.request_id}`} />
                                        <EditButton url={`/my/comments/${data.id}`} />
                                    </>
                                )}
                            </div>

                        </div>

                        <Typography
                            className='mt-4 mb-8 text-justify line-clamp-3 text-ellipsis'
                            variant="body-sm"
                        >
                            {data.body}
                        </Typography>

                        {/* attached files */}
                        {data.attached_files.length > 0 ? (<AttachedFiles files={data.attached_files} />) : null}


                        <div className="flex-center-between">
                            <ReplyButton
                                auth_required={auth_required}
                                id={data.id}
                                type="comment"
                            />
                            <CommentDetailsButtons
                                user_vote={data.user_vote_status}
                                comment_id={data.id}
                                likes_count={data.likes_count}
                                dislikes_count={data.dislikes_count}
                                replies_count={data.replies_count}
                                auth_required={auth_required}
                            />
                        </div>

                    </div>





                    <Comments
                        request_id={data.request_id}
                        request_author_id={data.author_id}
                        canReply={!!session?.user}
                        order={order}
                        commentable='comment'
                        commentable_id={data.id}
                        count={data.replies_count}
                    />
                </div>




            </div>
        </AuthRequiredProvider>
    )
}
