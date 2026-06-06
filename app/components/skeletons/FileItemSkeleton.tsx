import { FileIcon, TrashIcon } from 'lucide-react'

export default function FileItemSkeleton() {


    return (
        <div className="py-1.5 px-4 bg-background rounded-xl flex flex-row items-center gap-x-3">
            <div className="size-5 lg:size-6 bg-muted rounded-full flex-center animate-pulse" />
            <div className="flex flex-col gap-y-0.5">
                <div className="w-24 h-4 lg:h-5 bg-muted rounded-full animate-pulse" />
                <div className="w-10 h-3.25 lg:h-4.5 bg-muted rounded-full animate-pulse" />
            </div>
        </div>

    )
}
