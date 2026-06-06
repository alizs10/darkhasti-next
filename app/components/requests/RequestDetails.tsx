import { CalendarIcon, FileIcon, MessageCircleCheckIcon, SaveIcon, User2Icon, UserIcon } from 'lucide-react'
import Comments from '../comments/Comments';
import { CommentOrder, Request } from '@/app/types';
import { auth } from '@/app/lib/auth';
import BackButton from '../common/BackButton';
import momentFa from '@/app/lib/moment';
import RequestDetailsButtons from './RequestDetailsButtons';
import ReplyButton from '../common/ReplyButton';
import { AuthRequiredProvider } from '@/app/context/AuthRequiredContext';
import FileItem from '../common/attach-files/FileItem';
import AttachedFiles from '../common/attach-files/AttachedFiles';
import EditButton from '../common/EditButton';
import { Typography } from '../common/Typography';
import DeleteRequestDetailsButton from '../common/DeleteRequestDetailsButton';

interface RequestDetailsProps {
    data: Request;
    order: CommentOrder
}


export default async function RequestDetails({ data, order }: RequestDetailsProps) {
    const session = await auth()
    const auth_required = !session?.user

    return (
        <div className='flex flex-col flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto py-10'>

            <BackButton url={`/`} />

            <div className="w-full flex flex-col">
                <Typography
                    className='mt-10'
                    variant="body"
                    weight='medium'
                >
                    درخواست
                </Typography>

                <div className="mt-4 p-4 md:p-6 rounded-2xl flex flex-col bg-secondary">

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

                                <Typography
                                    className='text-muted-foreground'
                                    variant="caption-xs"
                                >
                                    {momentFa(new Date(data.published_at ?? data.created_at)).format("D MMMM YYYY")}
                                </Typography>


                            </div>


                        </div>


                        <div className="flex-row-center gap-x-3">
                            {data.is_answered && (
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
                            {data.published_at === null && (
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
                            {data.author_id === Number(session?.user?.id) && (
                                <>
                                    <DeleteRequestDetailsButton request_id={data.id} title={data.title} back_url={"/my/requests"} />
                                    <EditButton url={`/my/requests/${data.id}`} />
                                </>
                            )}


                        </div>
                    </div>

                    <Typography
                        className='mt-4'
                        variant="h4"
                        weight='semibold'
                    >
                        {data.title}
                    </Typography>

                    <Typography
                        className='mt-4 mb-8'
                        variant="pre"
                    >
                        {data.description}
                    </Typography>

                    {data.attached_files.length > 0 ? (
                        <AttachedFiles files={data.attached_files} theme='default' />
                    ) : null}

                    <div className="flex-center-between mt-4">

                        <AuthRequiredProvider>
                            <ReplyButton
                                auth_required={auth_required}
                                id={data.id}
                                type="request"
                            />
                            <RequestDetailsButtons
                                user_vote={data?.user_vote_status ?? null}
                                request_id={data.id}
                                likes_count={data.likes_count}
                                dislikes_count={data.dislikes_count}
                                replies_count={data.replies_count}
                                auth_required={auth_required}
                            />



                        </AuthRequiredProvider>

                    </div>
                </div>
            </div>


            <Comments
                order={order}
                commentable='request'
                commentable_id={data.id}
                count={data.replies_count}
                pinned={data.chosen_answer}
                canReply={!!session?.user}
                request_id={data.id}
                request_author_id={data.author_id}
            />
        </div>
    )
}
