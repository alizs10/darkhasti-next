import { PaginationData, Request, RequestOrder } from "@/app/types";
import RequestsClient from "./RequestsClient";
import { auth } from "@/app/lib/auth";


interface RequestsProps {
    my?: boolean;
    data?: Request[] | null;
    paginationData?: PaginationData;
    order: RequestOrder;
}

export default async function AllRequests({ my = false, data, paginationData, order }: RequestsProps) {

    const session = await auth()

    const user_id = session?.user.id

    return (
        <RequestsClient
            my={my}
            data={data}
            order={order}
            pagination={paginationData}
            user_id={user_id}
        />
    )
}
