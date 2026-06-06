import { getRequests } from "@/app/actions/request";
import AllRequests from "@/app/components/requests/AllRequests";
import { REQUEST_ORDERS } from "@/app/constants/orders";
import { RequestOrder } from "@/app/types";

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ order?: RequestOrder, search?: string | null }> }) {

    const q = await searchParams;
    let order = q?.order ?? "visit"
    let search = q?.search ?? null
    order = !REQUEST_ORDERS.includes(order) ? "visit" : order

    const requestsData = await getRequests(order, search)


    if (!requestsData) {
        return null;
    }

    const { data, pagination } = requestsData;


    return (
        <AllRequests data={data} paginationData={pagination} order={order} />
    )
}
