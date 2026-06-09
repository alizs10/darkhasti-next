import { getMyComment } from '@/app/actions/comment';
import EditComment from '@/app/components/comments/EditComment';
import { AttachedFilesProvider } from '@/app/context/AttachedFilesContext';
import { sliceText } from '@/app/helpers';
import { Metadata, ResolvingMetadata } from 'next';
// import { CommentsProvider } from '@/app/context/CommentsContext';
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
    const result = await getMyComment(id)

    const comment = result?.data;

    if (!comment) {
        return {};
    }

    return {
        title: `درخواستی | ویرایش پاسخ ${sliceText(comment.body, 30)}`,
        description: comment.body
    };
}

export default async function MyCommentPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    // console.log(id)
    const result = await getMyComment(id)
    const data = result?.data;

    if (!data) {
        notFound()
    }

    // const { data: request } = data;
    return (
        <AttachedFilesProvider attachable_id={data.id} attachable_type="App\Models\Comment">
            {/* <CommentsProvider > */}
            <EditComment data={data} />
            {/* </CommentsProvider> */}
        </AttachedFilesProvider>
    )
}
