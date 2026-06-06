import React from 'react'
import { Typography } from '../../common/Typography'
import { Button } from '../../common/Button'
import { PlusIcon } from 'lucide-react'

export default function NoRequests() {
    return (
        <div className='flex-center flex-col gap-y-4 py-10'>

            <Typography
                variant='body-sm'
            >
                اولین درخواست خود را ثبت کنید
            </Typography>


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


        </div>
    )
}
