"use client"

import SelectFilter from '../common/SelectFilter'
import { useComments } from '@/app/context/CommentsContext'
import { Typography } from '../common/Typography'
import { Skeleton } from '../ui/Skeleton'

export default function CommentsTopBar() {

    const { commentsCount } = useComments()

    // let commentsCount = null

    return (
        <div className="flex-center-between">

            {commentsCount === null ? (
                <Skeleton className='h-6 w-20' />
            ) : (
                <Typography
                    className='text-muted-foreground'
                    variant="caption"
                    weight='medium'
                >
                    {commentsCount ?? "-"}{" "}
                    پاسخ
                </Typography>
            )}

            {commentsCount !== null && commentsCount > 1 && (
                <SelectFilter type='comment' />
            )}

        </div>
    )

}
