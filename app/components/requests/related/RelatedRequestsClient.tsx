"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import RelatedRequestsList from "./RelatedRequestsList";
import { Request } from "@/app/types";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { Session } from "next-auth";
import { Typography } from "../../common/Typography";
import { Button } from "../../common/Button";

interface RelatedRequestsClientProps {
    data: Request[]
    user: Partial<Session>['user']
}

export default function RelatedRequestsClient({ user, data }: RelatedRequestsClientProps) {
    const [mounted, setMounted] = useState(false);
    const bPoint = useBreakpoint()

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalItems = data.length;

    const perSlice = useMemo(() => {

        if (bPoint === 'xs') {
            return 1;
        }

        if (bPoint === 'sm') {
            return 2
        }

        if (bPoint === 'md') {
            return 2
        }

        return 3

    }, [bPoint])
    const [currentSlice, setCurrentSlice] = useState(1)

    const totalSlices = useMemo(() => {

        return Math.ceil(totalItems / perSlice)

    }, [perSlice])

    const dataInView = useMemo(() => {

        const start = (currentSlice - 1) * perSlice;
        const end = start + perSlice;
        return data.slice(start, end);
    }, [perSlice, currentSlice, data]);



    const listContainerRef = useRef<null | HTMLDivElement>(null)

    function goForward() {
        setCurrentSlice(prev => prev < totalSlices ? prev + 1 : 1)
    }

    function goBackward() {
        setCurrentSlice(prev => prev > 1 ? prev - 1 : totalSlices)
    }

    function goToSlice(slice: number) {
        setCurrentSlice(slice)
    }

    return (
        <div className='w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto py-10 flex flex-col border-b border-muted'>

            <div className="flex-center-between min-h-7">
                <Typography
                    className='text-foreground'
                    variant="body"
                    weight='semibold'
                >
                    درخواست‌های مرتبط
                </Typography>


                {mounted ?
                    totalSlices > 1 ? (
                        <div className="flex-row-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={goBackward} className="">
                                <ChevronRightIcon className='size-5' />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={goForward}>
                                <ChevronLeftIcon className='size-5' />
                            </Button>
                        </div>
                    ) : null :
                    <div className="flex-row-center gap-x-1.5">

                        <div className="size-7 rounded-full bg-muted animate-pulse"></div>
                        <div className="size-7 rounded-full bg-muted animate-pulse"></div>

                    </div>
                }
            </div>

            <RelatedRequestsList data={dataInView} ref={listContainerRef} user={user} showSkeletons={!mounted} />


            {mounted ? (totalSlices > 1 ? (

                <div className="flex-row-center gap-x-1 mx-auto mt-4 py-1 px-2 rounded-full bg-muted">
                    {Array.from({ length: totalSlices }).map((_, i) => (
                        <button
                            key={i}
                            className={`h-1.5 rounded-full ${currentSlice - 1 === i ? 'bg-primary w-4' : 'bg-muted-foreground w-1.5'} transition-all duration-200`}
                            onClick={() => goToSlice(i + 1)}
                        />
                    ))}
                </div>
            ) : null) : (
                <div className="flex-row-center gap-x-1 mx-auto mt-4 py-1 px-2 rounded-full bg-muted animate-pulse">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <button key={i} className={`h-1.5 rounded-full ${i === 0 ? 'bg-primary w-4' : 'bg-muted-foreground w-1.5'} transition-all duration-200`} />
                    ))}
                </div>
            )}


        </div>
    )
}
