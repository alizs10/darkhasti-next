import { getComment } from '@/app/actions/comment';
import CommentDetails from '@/app/components/comments/CommentDetails'
import { COMMENT_ORDERS } from '@/app/constants/orders';
import { sliceText } from '@/app/helpers';
import { Comment, CommentOrder } from '@/app/types';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ id: string }>; // Next.js 15/16 params are Promises
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // 1. Await params (required in Next.js 15+)
    const { id } = await params;

    // 2. Fetch your data
    const result = await getComment(id)

    const comment = result?.data;

    if (!comment) {
        return {};
    }

    return {
        title: `درخواستی | پاسخ ${sliceText(comment.body, 30)}`,
        description: comment.body
    };
}

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
