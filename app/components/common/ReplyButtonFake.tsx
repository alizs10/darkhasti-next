import { ReplyIcon } from 'lucide-react'
import { Typography } from './Typography'


export default function ReplyButtonFake() {


    return (
        <div className="rounded-full flex-row-center gap-x-2">
            <ReplyIcon className='size-3.5' />
            <Typography

                variant="caption-xs"
            >
                پاسخ
            </Typography>
        </div>
    )
}
