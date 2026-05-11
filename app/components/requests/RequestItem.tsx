import { MessageCircleCheckIcon, MessagesSquareIcon, PenIcon, TrendingUpIcon } from 'lucide-react'
import Link from 'next/link'


interface RequestItemProps {
    slug: string;
    title: string;
    description: string;
    is_answered: boolean;
    comments_count: number;
    visits_count: number;
    editable?: boolean;
}

export default function RequestItem({ slug, title, description, is_answered, comments_count, visits_count, editable = false }: RequestItemProps) {
    return (
        <Link href={`/requests/${slug}`} className="col-span-1 h-fit flex flex-col bg-muted rounded-3xl p-4">
            <div className="flex flex-row justify-between">
                <span className="text-sm font-semibold text-foreground">{title}</span>

                {editable && (
                    <Link href={`/my/requests/${slug}/edit`} className="flex-row-center gap-x-2 px-3 py-1 rounded-full text-xs border border-muted-foreground text-foreground hover:text-warning hover:border-warning hover:bg-warning/10 transition-colors duration-100 hover:outline-4 outline-warning/10">
                        <PenIcon className="size-3" />
                        <span>ویرایش</span>
                    </Link>
                )}
            </div>

            <p className="text-xs leading-relaxed mt-4 text-justify line-clamp-3 text-ellipsis">{description}</p>

            <div className="mt-4">
                <div className="mt-auto rounded-full flex-row-center gap-x-1">

                    {is_answered && (
                        <div className="h-6 bg-background/50 rounded-full px-4 flex-row-center gap-x-1 text-success">
                            <MessageCircleCheckIcon className="size-3.5" />
                            <span className="text-xs text-nowrap sm:hidden md:block">پاسخ داده شده</span>
                        </div>
                    )}
                    <div className="h-6 bg-background/50 rounded-full px-4 flex-row-center gap-x-1 text-warning">
                        <MessagesSquareIcon className="size-3.5" />
                        <span className="text-xs">{comments_count}</span>
                    </div>
                    <div className="h-6 bg-background/50 rounded-full px-4 flex-row-center gap-x-1 text-primary">
                        <TrendingUpIcon className="size-3.5" />
                        <span className="text-xs">{visits_count}</span>
                    </div>

                </div>
            </div>
        </Link>
    )
}
