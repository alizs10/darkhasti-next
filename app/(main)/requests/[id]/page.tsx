import { getRequest, requestsReq } from "@/app/actions/request"; // Import the new function
import Comments from "@/app/components/comments/Comments";
import RelatedRequests from "@/app/components/requests/related/RelatedRequests";
import RequestDetails from "@/app/components/requests/RequestDetails";
import { sliceText } from "@/app/helpers";
import { auth } from "@/app/lib/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ id: string }>;
};

// 1. PRE-RENDERING: Tell Next.js which IDs to build at compile time
export async function generateStaticParams() {
    // Fetch the top 100 most visited request IDs
    // Make sure this function is lightweight and ONLY returns IDs!
    try {
        // Use a lightweight, no‑headers fetch call here – avoid any request that touches `headers()`.
        const result = await fetch(`${process.env.BACKEND_API_URL}/requests?order=visit&per_page=100`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json());

        return result?.data?.map((req: any) => ({ id: String(req.id) })) || [];
    } catch (error) {
        console.error("Failed to generate static params, using empty array", error);
        return [];
    }
}

// 2. ISR (Optional but recommended): Revalidate these pages every hour
// This ensures that if a high-visited request gets updated, the static page updates too
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const result = await getRequest(id);
    const request = result?.data?.data;

    if (!request) return {};

    return {
        title: `درخواستی | ${sliceText(request.title, 30)}`,
        description: request.description
    };
}

// 3. THE PAGE COMPONENT (See Step 2 below for the crucial change!)
export default async function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const result = await getRequest(id);
    const data = result?.data;

    if (!data?.data || data.errors) {
        notFound();
    }

    const session = await auth()

    const { data: request } = data;

    return (
        <>
            <RequestDetails data={request} />
            {/* We moved the comments/searchParams logic to a separate component (See Step 2) */}
            {/* <CommentsSection request_id={request.id} />  */}

            <Comments
                // order={order}
                commentable='request'
                commentable_id={request.id}
                count={request.replies_count}
                pinned={request.chosen_answer}
                canReply={!!session?.user}
                user={session?.user}
                request_id={request.id}
                request_author_id={request.author_id}
            />

            <RelatedRequests request_id={request.id} />
        </>
    );
}