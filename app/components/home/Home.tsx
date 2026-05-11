import { PlusIcon, SearchIcon } from 'lucide-react'
import HomeRequests from './HomeRequests'
import Link from 'next/link'

export default function Home() {
    return (
        <div className='py-20 flex-center flex-col gap-y-16'>


            <div className="flex flex-col gap-y-20 sticky top-16 w-full">
                <h1 className='text-center flex flex-col gap-y-2'>
                    <span className='font-bold text-lg'>محدودیتی وجود نداره!</span>
                    <span className='text-xl'>جای هر درخواستی اینجاست...</span>
                </h1>


                <div className="flex-row-center gap-x-2 h-12 w-full px-4 flex-center md:max-w-xl xl:max-w-3xl mx-auto">
                    <div className='bg-muted p-2 rounded-full h-full flex-center flex-1'>
                        <input type="text" className="text-sm flex-1 focus:outline-0 focus:ring-0 px-4 rounded-full h-full"
                            placeholder='جستجو میان درخواستی ها'
                        />
                        <div className='h-full aspect-square flex-center bg-muted text-sm font-semibold text-foreground rounded-full'>
                            <SearchIcon className='size-5' />
                        </div>
                    </div>

                    <Link href={"/new-request"} className='h-full bg-primary text-sm font-semibold text-primary-foreground rounded-full flex-center gap-x-1 aspect-square md:aspect-auto md:px-6 transition-colors duration-100 hover:outline-4 outline-primary/10'>
                        <PlusIcon className='size-6' />
                        <span className='text-sm hidden md:block text-nowrap'>درخواست جدید</span>
                    </Link>

                </div>
            </div>



            <HomeRequests />

        </div>
    )
}
