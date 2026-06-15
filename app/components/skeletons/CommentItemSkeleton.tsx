import { Skeleton } from '@/app/components/ui/Skeleton'; // Adjust path to your Skeleton component

export default function CommentItemSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl bg-secondary p-4">

            {/* Header: Author Info & Actions */}
            <div className="flex justify-between items-start">

                {/* Left: Avatar & Name/Time */}
                <div className="flex-row-center gap-x-2">
                    {/* Avatar Placeholder */}
                    <Skeleton className="size-10 rounded-full" />

                    <div className="flex flex-col gap-y-1.5">
                        {/* Username Placeholder */}
                        <Skeleton className="h-4 w-24 rounded-full" />
                        {/* Time Placeholder */}
                        <Skeleton className="h-3 w-16 rounded-full" />
                    </div>
                </div>

            </div>

            {/* Body: Comment Text (Matching the line-clamp-3) */}
            <div className="mt-4 mb-6 space-y-2">
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-3/4 rounded-full" /> {/* Shorter last line for realism */}
            </div>

            {/* Attached Files Placeholder (Optional, but prevents layout shift if files exist) */}
            <Skeleton className="h-10 w-40 rounded-xl mb-4" />

            {/* Footer: Interaction Buttons (Like, Dislike, Reply) */}
            <div className="mt-2 flex-center-between">
                <Skeleton className="h-6 w-16 rounded-full" />




                <div className="flex flex-wrap items-center gap-1">
                    <Skeleton className="h-6 w-10 rounded-full" />
                    <Skeleton className="h-6 w-10 rounded-full" />
                    <Skeleton className="h-6 w-10 rounded-full" />
                </div>
            </div>

        </div>
    );
}