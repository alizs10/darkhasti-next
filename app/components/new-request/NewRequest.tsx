import { FilePlusIcon, SaveIcon, SendIcon } from 'lucide-react'
import React from 'react'

export default function NewRequest() {
    return (
        <div className='py-10 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 max-w-6xl md:mx-auto flex-1 w-full'>

            <h2 className='font-semibold text-foreground text-base'>فرم درخواست جدید</h2>

            <form action="">

                <div className="flex flex-col py-4 gap-y-2 border-b border-muted">

                    <input type="text" placeholder="عنوان" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />

                    <textarea name="" id="" placeholder="توضیحات"
                        rows={10}

                        className='border resize-none border-muted rounded-3xl px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground' />

                    <button className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                        <FilePlusIcon className="size-4" />
                        <span>ضمیمه فایل</span>
                    </button>

                </div>


                <div className="flex-row-center gap-x-2 pt-4 max-w-md mr-auto">
                    <button className="flex-1 flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-warning text-warning hover:bg-warning/10 transition-colors duration-100 hover:outline-4 outline-warning/10">
                        <SaveIcon className="size-4" />
                        <span className='text-nowrap'>ذخیره در پیش نویس ها</span>
                    </button>
                    <button className="flex-1 flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-primary text-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                        <SendIcon className="size-4" />
                        <span>انتشار</span>
                    </button>
                </div>
            </form>

        </div>
    )
}
