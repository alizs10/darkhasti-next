import { getRelatedRequests } from '@/app/actions/request'
import RelatedRequestsClient from './RelatedRequestsClient'
import { auth } from '@/app/lib/auth'

interface RelatedRequestsProps {
    request_id: string | number
}

export default async function RelatedRequests({ request_id }: RelatedRequestsProps) {

    const session = await auth();
    const user = session?.user

    const data = await getRelatedRequests(request_id)
    const relatedRequests = data?.data ?? []

    if (relatedRequests.length === 0) {
        return null;
    }

    return (
        <RelatedRequestsClient user={user} data={relatedRequests} />
    )
}
