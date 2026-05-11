import React from 'react'

export default function Footer() {
    return (
        <footer className='px-4 py-10 border-t border-muted max-h-fit'>

            <div className="flex flex-col gap-y-2">

                <div className="flex-center gap-x-1">

                    {/* <p className='text-sm text-center text-foreground'>درخواستی</p>
                    <p className='text-sm text-center text-foreground'>-</p> */}
                    <p className='text-sm text-center text-foreground'>ساخته شده در اردیبهشت ۱۴۰۵</p>


                </div>



                <p className='leading-relaxed text-xs text-center text-muted-foreground'>تمامی حقوق این وب اپلیکیشن متعلق به درخواستی می باشد و هرگونه کپی برداری پیگرد قانونی دارد.</p>
            </div>
        </footer>
    )
}
