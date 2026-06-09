import { getMyRequests } from "@/app/actions/request";
import Requests from "@/app/components/requests/AllRequests";
import { REQUEST_ORDERS } from "@/app/constants/orders";
import { RequestOrder } from "@/app/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'درخواستی | درخواست‌های من',
};

// 1. Type searchParams as a generic string to avoid the "Type Lie"
type PageProps = {
    searchParams: Promise<{ order?: string }>;
};

export default async function MyRequestsPage({ searchParams }: PageProps) {
    const q = await searchParams;
    const rawOrder = q?.order;

    // 2. Safely validate the order to prevent TypeScript errors and invalid URLs
    const isValidOrder = !!rawOrder && (REQUEST_ORDERS as readonly string[]).includes(rawOrder);

    // 3. Fallback to "visit" if invalid, otherwise cast the valid string to RequestOrder
    const order: RequestOrder = isValidOrder ? (rawOrder as RequestOrder) : "visit";

    const requestsData = await getMyRequests(order);

    // Handle complete API failure (if your action returns null/undefined on error)
    if (!requestsData) return null;

    const { data, pagination } = requestsData;

    return (
        // The <Requests /> component should handle the case where data is an empty array []
        <Requests data={data} paginationData={pagination} order={order} my />
    );
}