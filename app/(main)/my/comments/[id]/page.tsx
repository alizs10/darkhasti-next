import { getMyComment } from '@/app/actions/comment';
import EditComment from '@/app/components/comments/EditComment';
import { AttachedFilesProvider } from '@/app/context/AttachedFilesContext';
// import { CommentsProvider } from '@/app/context/CommentsContext';
import { notFound } from 'next/navigation';
import React from 'react'

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
