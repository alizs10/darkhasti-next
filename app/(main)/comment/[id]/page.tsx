import { getComment } from '@/app/actions/comment';
import CommentDetails from '@/app/components/comments/CommentDetails'
import { COMMENT_ORDERS } from '@/app/constants/orders';
import { Comment, CommentOrder } from '@/app/types';
import { notFound } from 'next/navigation';



export default async function CommentDetailsPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ comment_order?: CommentOrder }> }) {

    const q = await searchParams;
    let order = q?.comment_order ?? "new"
    order = !COMMENT_ORDERS.includes(order) ? "new" : order

    const { id } = await params;
    const repliesData = await getComment(id)

    if (!repliesData || !repliesData.data) {
        notFound()
    }

    const { data } = repliesData;

    return (
        <CommentDetails order={order} data={data} />
    )
}
