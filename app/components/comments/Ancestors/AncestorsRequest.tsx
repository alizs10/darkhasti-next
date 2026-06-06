import { Request } from '@/app/types'
import React from 'react'
import ReplyButton from '../../common/ReplyButton'
import RequestDetailsButtons from '../../requests/RequestDetailsButtons'
import { CalendarIcon, FileIcon, MessageCircleCheckIcon, User2Icon, UserIcon } from 'lucide-react'
import momentFa from '@/app/lib/moment'
import { Session } from 'next-auth'
import ReplyButtonFake from '../../common/ReplyButtonFake'
import Link from 'next/link'
import AttachedFiles from '../../common/attach-files/AttachedFiles'
import EditButton from '../../common/EditButton'
import { Typography } from '../../common/Typography'
import { AuthRequiredProvider } from '@/app/context/AuthRequiredContext'
import DeleteRequestDetailsButton from '../../common/DeleteRequestDetailsButton'

interface AncestorsRequestProps {
    request: Request
    user: Partial<Session>['user']

}

export default function AncestorsRequest({ request, user }: AncestorsRequestProps) {

    const auth_required = !user

    return (
        <div className="relative">
            <Link href={`/requests/${request.id}`} >

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
                                    {request.author?.username}
                                </Typography>

                                <Typography
                                    className='text-muted-foreground'
                                    variant="caption-xs"
                                >
                                    {momentFa(new Date(request.published_at)).format("D MMMM YYYY")}
                                </Typography>


                            </div>


                        </div>


                        <div className="flex-row-center gap-x-3">


                            {request.author_id === Number(user?.id) && (
                                <>
                                    <DeleteRequestDetailsButton request_id={request.id} title={request.title} back_url={"/my/requests"} />

                                    <EditButton url={`/my/requests/${request.id}`} />
                                </>
                            )}

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
                        </div>
                    </div>

                    <Typography
                        className='mt-4'
                        variant="h4"
                        weight='semibold'
                    >
                        {request.title}
                    </Typography>

                    <Typography
                        className='mt-4 mb-8'
                        variant="pre"
                    >
                        {request.description}
                    </Typography>

                    {request.attached_files.length > 0 ? (
                        <AttachedFiles files={request.attached_files} theme='default' />
                    ) : null}

                    <div className="flex-center-between mt-4">

                        <AuthRequiredProvider>
                            <ReplyButton
                                auth_required={auth_required}
                                id={request.id}
                                type="request"
                            />
                            <RequestDetailsButtons
                                user_vote={request?.user_vote_status ?? null}
                                request_id={request.id}
                                likes_count={request.likes_count}
                                dislikes_count={request.dislikes_count}
                                replies_count={request.replies_count}
                                auth_required={auth_required}
                            />



                        </AuthRequiredProvider>

                    </div>
                </div>


            </Link>

            <div className="absolute h-8 w-0.5 bg-secondary top-full right-8" />
        </div>
    )
}

// <div className="border-r px-4 py-4 border-b border-muted-foreground">

//     <div className="flex-center-between">


//         <h2 className='font-semibold text-foreground text-base'><span className='text-muted-foreground'>درخواست:‌</span> {request.title}</h2>

//         {request.author_id === Number(user?.id) && (

//             <EditButton url={`/my/requests/${request.id}`} />
//         )}

//     </div>
//     <div className="w-fit mt-2 divide-x divide-muted-foreground/10 grid grid-cols-2">

//         <div className="flex-center pl-4 gap-x-2 text-xs text-muted-foreground">
//             <CalendarIcon className='size-3.5' />
//             <span>{momentFa(new Date(request.published_at)).format("D MMMM YYYY")}</span>
//         </div>
//         <div className="flex-center pl-4 gap-x-2 text-xs text-muted-foreground">
//             <UserIcon className='size-3.5' />
//             <span>{request?.author?.username}</span>
//         </div>

//     </div>

//     <p className='mt-2 text-sm leading-relaxed text-muted-foreground text-justify'>
//         {request.description}
//     </p>



//     {/* attached files */}
//     {request?.attached_files?.length > 0 ? (<AttachedFiles theme='lighter' files={request.attached_files} />) : null}

//     <div className="flex-center-between mt-4">


//         <RequestDetailsButtons
//             user_vote={request?.user_vote_status ?? null}
//             request_id={request.id}
//             likes_count={request.likes_count}
//             dislikes_count={request.dislikes_count}
//             replies_count={request.replies_count}
//             auth_required={auth_required}
//         />


//         <ReplyButtonFake />

//     </div>
// </div>