import { getMyRequest } from '@/app/actions/request';
import EditRequest from '@/app/components/edit-request/EditRequest'
import { AttachedFilesProvider } from '@/app/context/AttachedFilesContext';
import { sliceText } from '@/app/helpers';
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
    const result = await getMyRequest(id)

    const request = result?.data;

    if (!request) {
        return {};
    }

    return {
        title: `درخواستی | ویرایش درخواست ${sliceText(request.title, 30)}`,
        description: request.description
    };
}

export default async function EditMyRequestPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    // console.log(id)
    const result = await getMyRequest(id)
    const data = result?.data;

    if (!data) {
        notFound()
    }
    return (
        <AttachedFilesProvider attachable_type='App\Models\Request' attachable_id={data.id}>
            <EditRequest request={data} />
        </AttachedFilesProvider>
    )
}
