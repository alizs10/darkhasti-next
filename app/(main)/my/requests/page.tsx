import { getMyRequests } from "@/app/actions/request";
import Requests from "@/app/components/requests/AllRequests";
import { REQUEST_ORDERS } from "@/app/constants/orders";
import { RequestOrder } from "@/app/types";

export default async function MyRequestsPage({ searchParams }: { searchParams: Promise<{ order?: RequestOrder }> }) {

    const q = await searchParams;
    let order = q?.order ?? "visit"
    order = !REQUEST_ORDERS.includes(order) ? "visit" : order


    const requestsData = await getMyRequests(order)
    if (!requestsData) return null;

    const { data, pagination } = requestsData;
    return (
        <Requests data={data} paginationData={pagination} order={order} my />
    )
}
