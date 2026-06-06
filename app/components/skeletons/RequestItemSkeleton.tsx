export default function RequestItemSkeleton() {
    return (
        <div className="col-span-1 h-68 flex flex-col bg-muted rounded-2xl p-4">
            {/* Header */}
            <div className="flex justify-between items-start">

                <div className="flex-row-center gap-x-2 flex-1">
                    <div className="size-10 rounded-full bg-muted-foreground/20 animate-pulse" />

                    <div className="flex flex-col gap-y-0.5">
                        <div className="h-4 bg-muted-foreground/20 rounded-full w-10" />
                        <div className="h-4 bg-muted-foreground/20 rounded-full w-14" />
                    </div>
                </div>

                <div className="h-4 bg-muted-foreground/20 rounded-full w-32" />
            </div>




            <div className="mt-4 h-5 bg-muted-foreground/20 rounded-full w-full"></div>

            {/* Description lines */}
            <div className="mt-4 mb-8 space-y-2">
                <div className="h-4 bg-muted-foreground/20 rounded-full w-full" />
                <div className="h-4 bg-muted-foreground/20 rounded-full w-full" />
                <div className="h-4 bg-muted-foreground/20 rounded-full w-10/12" />
            </div>

            {/* Badges - 3 items */}
            <div className="mt-auto mr-auto">
                <div className="rounded-full flex flex-wrap items-center gap-1">
                    <div className="h-4 w-8 bg-muted-foreground/20 rounded-full"></div>
                    <div className="h-4 w-8 bg-muted-foreground/20 rounded-full"></div>
                    <div className="h-4 w-8 bg-muted-foreground/20 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}