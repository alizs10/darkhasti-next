import { getRequest } from "@/app/actions/request";
import RelatedRequests from "@/app/components/requests/related/RelatedRequests";
import RequestDetails from "@/app/components/requests/RequestDetails";
import { COMMENT_ORDERS } from "@/app/constants/orders";
import { sliceText } from "@/app/helpers";
import { CommentOrder } from "@/app/types";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

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
    const result = await getRequest(id)

    const request = result?.data?.data;

    if (!request) {
        return {};
    }

    return {
        title: `درخواستی | ${sliceText(request.title, 30)}`,
        description: request.description
    };
}


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
