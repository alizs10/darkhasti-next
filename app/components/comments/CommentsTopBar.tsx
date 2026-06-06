"use client"

import SelectFilter from '../common/SelectFilter'
import { useComments } from '@/app/context/CommentsContext'
import { Typography } from '../common/Typography'

export default function CommentsTopBar() {

    const { commentsCount } = useComments()

    return (
        <div className="flex-center-between">

            <Typography
                className='text-muted-foreground'
                variant="caption"
                weight='medium'
            >
                {commentsCount ?? "-"}{" "}
                پاسخ
            </Typography>

            {commentsCount > 1 && (
                <SelectFilter type='comment' />
            )}

        </div>
    )

}
