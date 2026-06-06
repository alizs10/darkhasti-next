import { PlusIcon } from 'lucide-react'
import HomeRequests from './HomeRequests'
import Link from 'next/link'
import { PaginationData, Request } from '@/app/types'
import SearchInput from './SearchInput'
import { SearchRequestsProvider } from '@/app/context/SearchRequestsContext'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'

interface HomeProps {
    data?: Request[] | null
    meta?: PaginationData

}

export default async function Home({ data, meta }: HomeProps) {

    return (
        <div className='py-20 flex-center flex-col gap-y-16'>


            <div className="flex flex-col gap-y-20 sticky top-16 w-full">


                <div className="flex flex-col lg:gap-y-3">
                    <Typography
                        className='mx-auto'
                        variant="h1">
                        محدودیتی وجود نداره!
                    </Typography>
                    <Typography
                        className='mt-2 mx-auto'
                        variant="h4"
                        weight='medium'
                    >
                        جای هر درخواستی اینجاست...
                    </Typography>
                </div>



                <div className="flex-row-center gap-x-2 h-12 w-full flex-center md:max-w-xl xl:max-w-3xl mx-auto px-4 sm:px-8 md:px-0">
                    <SearchRequestsProvider>
                        <SearchInput />
                    </SearchRequestsProvider>

                    <Button href={"/new-request"} variant='primary' size='md' className='aspect-square md:aspect-auto !px-0 md:!px-6 lg:!px-8' leftIcon={<PlusIcon className='size-6' />}>
                        <Typography
                            className='hidden md:block text-nowrap'
                            variant="caption"
                            weight='medium'
                        >
                            درخواست جدید
                        </Typography>
                    </Button>


                </div>
            </div>



            <HomeRequests data={data} meta={meta} />

        </div>
    )
}
