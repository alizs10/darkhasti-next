import { CpuIcon, CupSodaIcon, FileIcon, MedalIcon, MessageCircleCheck, MessageCircleCheckIcon, MessagesSquareIcon, ReplyIcon, ThumbsDownIcon, ThumbsUpIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CommentItem() {
  return (
    <Link href={"/comment/123123"} className='flex flex-col rounded-xl bg-muted p-4'>

      <div className="w-full flex-center-between text-xs text-muted-foreground">
        <div className="flex-row-center gap-x-1">
          <UserIcon className='size-3.5' />
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

      <p className='mt-2 text-sm leading-relaxed text-justify'>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
      </p>

      <div className="mt-2 bg-background/50 rounded-xl gap-1 px-3 py-2 flex flex-col gap-y-2">
        <h3 className='text-xs text-muted-foreground font-semibold'>فایل های ضمیمه شده</h3>



        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <button key={i} className="bg-muted px-3 py-0.5 rounded-full flex-row-center gap-x-2">
              <span className='text-xs font-sans leading-relaxed'>file.txt</span>
              <FileIcon className='size-3.5' />
            </button>
          ))}
        </div>
      </div>


      <div className="flex-center-between mt-4">

        <div className="flex-row-center gap-x-3">
          <button className="rounded-full flex-row-center gap-x-1.5">
            <ThumbsUpIcon className='size-3.5' />
            <span className='text-xs font-sans leading-relaxed'>15</span>
          </button>
          <button className="rounded-full flex-row-center gap-x-1.5">
            <ThumbsDownIcon className='size-3.5' />
            <span className='text-xs font-sans leading-relaxed'>15</span>
          </button>

          <button className="rounded-full flex-row-center gap-x-1.5">
            <MessagesSquareIcon className='size-3.5' />
            <span className='text-xs font-sans leading-relaxed'>2</span>
          </button>
        </div>


        <button className="rounded-full flex-row-center gap-x-1.5">
          <ReplyIcon className='size-3.5' />
          <span className='text-xs font-sans leading-relaxed'>پاسخ</span>
        </button>

      </div>




    </Link>
  )
}
