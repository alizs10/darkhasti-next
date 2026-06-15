import { Skeleton } from '@/app/components/ui/Skeleton'; // Adjust the path to match your project

export default function FileItemSkeleton() {
    return (
        <div className="py-1.5 px-4 bg-background rounded-xl flex flex-row items-center gap-x-3">

            {/* Icon placeholder */}
            <Skeleton className="size-5 lg:size-6 rounded-full" />

            {/* Text placeholders */}
            <div className="flex flex-col gap-y-0.5">
                <Skeleton className="w-24 h-4 lg:h-5 rounded-full" />
                <Skeleton className="w-10 h-3.25 lg:h-4.5 rounded-full" />
            </div>

        </div>
    );
}