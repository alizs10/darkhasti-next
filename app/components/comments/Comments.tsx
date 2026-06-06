import { getComments } from '@/app/actions/comment';
import { Comment, CommentOrder } from '@/app/types';
import CommentsClient from './CommentsClient';
import { auth } from '@/app/lib/auth';

interface CommentsProps {
    order: CommentOrder;
    count: number;
    commentable: "request" | "comment";
    commentable_id: string | number;
    pinned?: Comment | null;
    canReply?: boolean;
    request_id: string | number;
    request_author_id: string | number;
}

export default async function Comments({ order, commentable, commentable_id, count, pinned, canReply, request_id, request_author_id }: CommentsProps) {

    const commentsData = await getComments(commentable_id, commentable, order)

    const session = await auth()
    const user = session?.user;

    if (!commentsData?.success) {
        return null;
    }

    const { data, pagination } = commentsData;

    if (!data) {
        return null;
    }

    // return null;

    return (
        <CommentsClient
            commentable={commentable}
            commentable_id={commentable_id}
            // count={count}
            data={data}
            order={order}
            pagination={pagination}
            request_id={request_id}
            request_author_id={request_author_id}
            user={user}
            // session={session}
            canReply={canReply}
            pinned={pinned}
        />

    )
}
