"use client"

import SearchInput from '../home/SearchInput'
import { PlusIcon, XIcon } from 'lucide-react'
import { useSearchRequests } from '@/app/context/SearchRequestsContext'
import Link from 'next/link'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'

export default function Search() {

    const { search, results_count, cancelSearch } = useSearchRequests()

    const resultFirstLine = (results_count && results_count > 0) ? `${results_count} درخواست` : "هیچ درخواستی"

    const resultSecondLine = `برای "${search}" پیدا ${(results_count && results_count > 0) ? 'شد' : 'نشد'}`

    return (
        <div className="py-20 flex flex-col gap-y-20 sticky top-0 px-4 sm:px-8 md:px-0">

            {search && (

                <div className="flex flex-col lg:gap-y-3">
                    <Typography
                        className='mx-auto'
                        variant="h1">
                        {resultFirstLine}
                    </Typography>
                    <Typography
                        className='mt-2 mx-auto'
                        variant="h4"
                        weight='medium'
                    >
                        {resultSecondLine}
                    </Typography>
                </div>
            )}

            <div className="flex-row-center gap-x-2 h-12 w-full flex-center md:max-w-xl xl:max-w-3xl mx-auto">
                <SearchInput />
                {search ? (
                    <Button
                        variant='destructive'
                        size='md'
                        onClick={cancelSearch}
                        rightIcon={<XIcon className='size-5' />}
                        className='px-0 aspect-square md:aspect-auto md:px-6'
                    >

                        <Typography variant='body' weight='medium' className='hidden md:block'>
                            لغو
                        </Typography>

                    </Button>
                ) : (<Button
                    rightIcon={<PlusIcon className='size-6' />}
                    href={"/new-request"}
                    size='md'
                    className='px-0 aspect-square md:aspect-auto md:px-6'
                >

                    <Typography variant='body' weight='medium' className='hidden md:block text-nowrap'>
                        درخواست جدید
                    </Typography>
                </Button>)}

            </div>
        </div>
    )
}
