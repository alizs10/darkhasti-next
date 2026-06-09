import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import RequestItem from "../requests/RequestItem";
import { PaginationData, Request } from "@/app/types";
import SelectFilter from "../common/SelectFilter";
import { auth } from "@/app/lib/auth";
import { Button } from "../common/Button";
import { Typography } from "../common/Typography";

interface HomeRequestsProps {
    data?: Request[] | null
    meta?: PaginationData
}

export default async function HomeRequests({ data, meta }: HomeRequestsProps) {

    const session = await auth()

    const user = session?.user;

    return (
        <div className="mt-10 flex flex-col flex-1 z-10 bg-background/30 backdrop-blur-md w-full">

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto flex-center-between sticky top-0 z-20 py-4 bg-background">

                <Typography
                    variant="h4"
                    weight='semibold'
                >
                    درخواست‌ها
                </Typography>

                <SelectFilter type="request" />
            </div>


            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 z-10">
                {data?.map((item, i) => (
                    <RequestItem key={i}
                        request={item}
                        isOwner={item.author_id === Number(user?.id)}
                    />
                ))}


            </div>
            {meta?.has_more_pages && (
                <Button
                    href={"/requests"}
                    className="w-fit mx-auto mt-8"
                    variant="outline-primary"
                    size="md"
                    leftIcon={<ArrowLeftIcon className="size-4" />}
                >
                    <Typography
                        variant="caption"
                    >
                        مشاهده همه
                    </Typography>
                </Button>
            )}

        </div>
    )
}
