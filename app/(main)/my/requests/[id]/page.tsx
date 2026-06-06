import { getMyRequest } from '@/app/actions/request';
import EditRequest from '@/app/components/edit-request/EditRequest'
import { AttachedFilesProvider } from '@/app/context/AttachedFilesContext';
import { notFound } from 'next/navigation';

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
