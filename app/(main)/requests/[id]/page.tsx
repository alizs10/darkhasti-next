import { getRequest } from "@/app/actions/request";
import RelatedRequests from "@/app/components/requests/related/RelatedRequests";
import RequestDetails from "@/app/components/requests/RequestDetails";
import { COMMENT_ORDERS } from "@/app/constants/orders";
import { CommentOrder } from "@/app/types";
import { notFound } from "next/navigation";




export default async function RequestDetailsPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ comment_order?: CommentOrder }> }) {

    const q = await searchParams;
    let order = q?.comment_order ?? "new"
    order = !COMMENT_ORDERS.includes(order) ? "new" : order
    const { id } = await params;
    // console.log(id)
    const result = await getRequest(id)
    const data = result?.data;

    if (!data?.data || data.errors) {
        notFound()
    }

    const { data: request } = data;


    return (
        <>
            <RequestDetails data={request} order={order} />
            <RelatedRequests request_id={request.id} />
        </>
    )
}
