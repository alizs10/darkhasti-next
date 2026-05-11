import { ArrowDownIcon, ChevronDownIcon, FileIcon, FilePlusIcon, MessageCircleCheck, MessagesSquareIcon, MoveRightIcon, ReplyIcon, SendIcon, ThumbsDownIcon, ThumbsUpIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CommentItem from './CommentItem'

export default function CommentDetails() {
    return (
        <div className='py-10 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 max-w-6xl md:mx-auto flex-1 w-full'>

            <Link href={"/"} className="rounded-full flex-row-center text-muted-foreground gap-x-1.5">
                <MoveRightIcon className='size-4' />
                <span className='text-sm leading-relaxed'>بازگشت</span>
            </Link>

            <div className="mt-4 w-full flex-center-between text-sm text-muted-foreground">
                <div className="flex-row-center gap-x-1">
                    <UserIcon className='size-4' />
                    <span className='font-semibold'>aure10</span>
                </div>
                <div className="flex-row-center gap-x-2">
                    <div className="px-3 py-1 rounded-full text-xs bg-success/10 text-success flex-row-center gap-x-1">
                        <MessageCircleCheck className='size-3.5' />
                        <span>
                            پاسخ برگزیده
                        </span>
                    </div>

                    <span>1 روز پیش</span>
                </div>
            </div>

            <p className='mt-2 text-sm leading-relaxed text-muted-foreground text-justify'>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>

            <div className="mt-2 bg-muted rounded-2xl gap-1 px-4 py-2 flex flex-col gap-y-2">
                <h3 className='text-sm text-muted-foreground font-semibold'>فایل های ضمیمه شده</h3>



                <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <button key={i} className="p-2 bg-background/50 px-4 py-1 rounded-full flex-row-center gap-x-2">
                            <span className='text-sm font-sans leading-relaxed'>file.txt</span>
                            <FileIcon className='size-4' />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-center-between mt-4">

                <div className="flex-row-center gap-x-4">
                    <button className="rounded-full flex-row-center gap-x-2">
                        <ThumbsUpIcon className='size-4' />
                        <span className='text-sm font-sans leading-relaxed'>15</span>
                    </button>
                    <button className="rounded-full flex-row-center gap-x-2">
                        <ThumbsDownIcon className='size-4' />
                        <span className='text-sm font-sans leading-relaxed'>15</span>
                    </button>

                    <button className="rounded-full flex-row-center gap-x-2">
                        <MessagesSquareIcon className='size-4' />
                        <span className='text-sm font-sans leading-relaxed'>36</span>
                    </button>
                </div>


                <button className="rounded-full flex-row-center gap-x-2">
                    <ReplyIcon className='size-4' />
                    <span className='text-sm font-sans leading-relaxed'>پاسخ</span>
                </button>

            </div>

            <div className="border-t border-muted mt-4 pt-4">

                <h2 className='font-semibold text-foreground text-sm'>پاسخ به کاربر <span className='text-muted-foreground'>aure10</span></h2>

                <form action="">

                    <div className="flex flex-col py-4 gap-y-2 border-b border-muted">
                        <textarea name="" id="" placeholder="پاسخ شما..."
                            rows={10}

                            className='border resize-none border-muted rounded-3xl px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground' />

                        <button className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                            <FilePlusIcon className="size-4" />
                            <span>ضمیمه فایل</span>
                        </button>

                    </div>


                    <div className="flex-row-center gap-x-2 pt-4 max-w-md mr-auto">

                        <button className="flex-1 flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-primary text-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                            <SendIcon className="size-4" />
                            <span>ارسال پاسخ</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-10 py-4 border-t border-muted">
                <div className="flex-center-between">
                    <h3 className='text-sm text-muted-foreground font-semibold'>2 پاسخ</h3>

                    <label htmlFor="filter" className="flex-row-center gap-x-2 bg-muted text-sm px-4 py-1 rounded-full">

                        <select className="appearance-none  focus:outline-0 focus:ring-0" name="filter" id="filter">
                            <option value="">محبوب ترین</option>
                            <option value="">جدیدترین</option>
                            <option value="">قدیمی ترین</option>
                        </select>
                        <ChevronDownIcon className="size-4" />
                    </label>
                </div>



                <div className="mt-8 grid grid-cols-1 gap-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <CommentItem key={i} />
                    ))}
                </div>

                <button className="mx-auto col-span-2 flex-row-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground mt-8 hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                    <span>پاسخ های بیشتر</span>
                    <ArrowDownIcon className="size-4" />
                </button>

            </div>

        </div>
    )
}
