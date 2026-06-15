import { Typography } from '../common/Typography'
import { Button } from '../common/Button'
import { PlusIcon } from 'lucide-react'

export interface NoRequestsProps {
    my?: boolean;
}

export default function NoRequests({ my = false }: NoRequestsProps) {

    const message = my ? "اولین درخواست خود را ثبت کنید" : "درخواستی وجود ندارد"


    return (
        <div className='flex-center flex-col gap-y-4 py-10'>

            <Typography
                variant='body-sm'
            >
                {message}
            </Typography>


            {my && (
                <Button
                    href='/new-request'
                    size='md'
                    rightIcon={<PlusIcon className='size-4' />}
                >
                    <Typography
                        variant='caption'
                        weight='medium'
                    >
                        ثبت درخواست
                    </Typography>
                </Button>
            )}


        </div>
    )
}
