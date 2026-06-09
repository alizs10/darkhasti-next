import { getRequests } from "@/app/actions/request";
import AllRequests from "@/app/components/requests/AllRequests";
import { REQUEST_ORDERS } from "@/app/constants/orders";
import { RequestOrder } from "@/app/types";
import { Metadata } from "next";

// Define props once to share between generateMetadata and the Page Component
type PageProps = {
    searchParams: Promise<{ order?: string; search?: string }>;
};

// 1. Replace static metadata with generateMetadata
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const q = await searchParams;

    // Safely extract and trim the search query
    const rawSearch = q?.search;
    const search = rawSearch && rawSearch.trim() !== "" ? rawSearch.trim() : null;

    if (search) {
        return {
            // 2. Dynamic title if a search query exists
            // Using Persian guillemets « » for better typography!
            title: `درخواستی | نتایج برای «${search}»`,

            // Optional: Add a specific description for search results for SEO
            description: `مشاهده نتایج جستجو برای کلمه "${search}" در درخواستی`,
        };
    }

    // 3. Fallback to default title if no search query
    return {
        title: 'درخواستی | همه درخواست‌ها',
        description: 'مشاهده لیست همه درخواست‌های ثبت شده در درخواستی',
    };
}

export default async function RequestsPage({ searchParams }: PageProps) {
    const q = await searchParams;

    // Safely validate the 'order' parameter
    const rawOrder = q?.order;
    const isValidOrder = !!rawOrder && (REQUEST_ORDERS as readonly string[]).includes(rawOrder);
    const order: RequestOrder = isValidOrder ? (rawOrder as RequestOrder) : "visit";

    // Safely handle the 'search' parameter (convert empty strings to null)
    const rawSearch = q?.search;
    const search = rawSearch && rawSearch.trim() !== "" ? rawSearch : null;

    // Fetch data
    const requestsData = await getRequests(order, search);

    if (!requestsData) {
        return null; // Or return an <EmptyState /> component if you prefer
    }

    const { data, pagination } = requestsData;

    return (
        <AllRequests data={data} paginationData={pagination} order={order} />
    );
}