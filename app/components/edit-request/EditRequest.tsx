import { FileIcon, FilePlusIcon, MoveRightIcon, PenIcon, SaveIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

export default function EditRequest() {
    return (
        <div className='py-10 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 max-w-6xl md:mx-auto flex-1 w-full'>

            <Link href={"/"} className="rounded-full flex-row-center text-muted-foreground gap-x-1.5">
                <MoveRightIcon className='size-4' />
                <span className='text-sm leading-relaxed'>بازگشت</span>
            </Link>

            <h2 className='mt-4 font-semibold text-foreground text-base'>ویرایش درخواست</h2>

            <form action="">

                <div className="flex flex-col py-4 gap-y-2 border-b border-muted">

                    <input type="text" placeholder="عنوان" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />

                    <textarea name="" id="" placeholder="توضیحات"
                        rows={10}

                        className='border resize-none border-muted rounded-3xl px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground' />

                    <div className="mt-2 bg-muted rounded-2xl gap-1 px-4 py-2 flex flex-col gap-y-2">
                        <h3 className='text-sm text-muted-foreground font-semibold'>فایل های ضمیمه شده</h3>



                        <div className="flex flex-wrap gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className='bg-background flex-row-center p-1 rounded-full gap-x-1'>
                                    <div className="p-2 bg-muted px-4 py-1 rounded-full flex-row-center gap-x-2">
                                        <span className='text-sm font-sans leading-relaxed'>file.txt</span>
                                        <FileIcon className='size-4' />
                                    </div>

                                    <button className='text-destructive p-2 rounded-full aspect-square bg-destructive/10'>
                                        <TrashIcon className='size-4' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


                <div className="flex-row-center gap-x-2 pt-4 max-w-md mr-auto">
                    <button className="flex-1 flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-warning text-warning hover:bg-warning/10 transition-colors duration-100 hover:outline-4 outline-warning/10">
                        <SaveIcon className="size-4" />
                        <span className='text-nowrap'>ذخیره در پیش نویس ها</span>
                    </button>
                    <button className="flex-1 flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-primary text-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                        <PenIcon className="size-4" />
                        <span>ویرایش</span>
                    </button>
                </div>
            </form>

        </div>
    )
}
