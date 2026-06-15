import { Skeleton } from '@/app/components/ui/Skeleton'; // Adjust the import path to match your project

export default function RequestItemSkeleton() {
    return (
        <div className="col-span-1 h-68 flex flex-col bg-secondary rounded-2xl p-4">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex-row-center gap-x-2 flex-1">
                    <Skeleton className="size-10 rounded-full" />

                    <div className="flex flex-col gap-y-0.5">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-14" />
                    </div>
                </div>

                <Skeleton className="h-4 w-32" />
            </div>

            {/* Title */}
            <Skeleton className="mt-4 h-5 w-full" />

            {/* Description lines */}
            <div className="mt-4 mb-8 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
            </div>

            {/* Badges - 3 items */}
            <div className="mt-auto mr-auto">
                <div className="flex flex-wrap items-center gap-1">
                    <Skeleton className="h-4 w-8 rounded-full" />
                    <Skeleton className="h-4 w-8 rounded-full" />
                    <Skeleton className="h-4 w-8 rounded-full" />
                </div>
            </div>

        </div>
    );
}