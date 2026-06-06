"use client"

import { RequestsProvider } from "@/app/context/RequestsContext"
import { ApiResponse, PaginationData, Request, RequestOrder } from "@/app/types"
import SelectFilter from "../common/SelectFilter";
import { LoadMoreButton } from "./LoadMoreButton";
import RequestsList from "./RequestsList";
import axiosClient from "@/app/lib/axios-client";
import Link from "next/link";
import Search from "./Search";
import { SearchRequestsProvider } from "@/app/context/SearchRequestsContext";
import { Button } from "../common/Button";
import { Grid2X2Icon, Rows2Icon } from "lucide-react";
import { useState } from "react";
import { Typography } from "../common/Typography";


async function loadMoreRequests(
    order: RequestOrder,
    cursor: string,
): Promise<{ data: Request[]; pagination: PaginationData }> {

    const url = `/requests?order=${order}&cursor=${cursor}`

    const result = await axiosClient.get<ApiResponse<Request[]>>(url);

    const data = result.data;

    if (!data.success || !data.data) {
        throw new Error('Failed to load more comments');
    }

    return {
        data: data.data,
        pagination: data.pagination as PaginationData
    };
}

interface RequestsClientProps {
    data?: Request[] | null;
    order: RequestOrder;
    pagination?: PaginationData;
    user_id?: string | number | null;
    my?: boolean
}

export default function RequestsClient({ data, pagination, order, user_id, my }: RequestsClientProps) {


    const [layoutType, setLayoutType] = useState<"rows" | "grid">("grid")


    return (
        <RequestsProvider
            init_data={data}
            initialPagination={pagination}
            requestOrder={order}
            onLoadMore={(cursor) => loadMoreRequests(order, cursor)}
        >

            <SearchRequestsProvider results_count={pagination?.total}>
                <Search />
            </SearchRequestsProvider>

            <div className="py-10 flex flex-col flex-1 w-full z-10">

                <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto flex-center-between z-20 bg-background py-4 sticky top-0">
                    <div className="flex-row-center gap-x-2">

                        <Link href={"/"}>
                            <Typography variant="body-sm" className="text-muted-foreground">
                                خانه/
                            </Typography>
                        </Link>


                        {my && (
                            <Link href={"/my"}>

                                <Typography variant="body-sm" className="text-muted-foreground">
                                    پروفایل/
                                </Typography>
                            </Link>

                        )}

                        <Typography variant="body-sm" weight="medium">
                            درخواست ها{my ? `ی من` : ''}
                        </Typography>
                    </div>

                    <div className="flex-row-center gap-x-1">


                        <div className="sm:flex flex-nowrap gap-x-0 rounded-full bg-secondary hidden">
                            <Button
                                onClick={() => setLayoutType("rows")}
                                size="icon-sm" variant="none" className={`text-muted-foreground ${layoutType === "rows" ? 'bg-primary text-primary-foreground' : ''}`}>
                                <Rows2Icon className="size-4" />
                            </Button>
                            <Button
                                onClick={() => setLayoutType("grid")}
                                size="icon-sm" variant="none" className={`text-muted-foreground ${layoutType === "grid" ? 'bg-primary text-primary-foreground' : ''}`}>
                                <Grid2X2Icon className="size-4" />
                            </Button>
                        </div>



                        {data && data?.length > 1 && (
                            <SelectFilter type="request" />
                        )}
                    </div>
                </div>


                <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto flex flex-col bg-background/30 backdrop-blur-md">
                    <RequestsList layout={layoutType} user_id={user_id} my={my} />



                    {pagination?.has_more_pages && (
                        <LoadMoreButton />
                    )}
                </div>

            </div>
        </RequestsProvider>
    )
}
