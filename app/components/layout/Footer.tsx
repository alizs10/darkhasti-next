import React from 'react'
import { Typography } from '../common/Typography'

export default function Footer() {
    return (
        <footer className='px-4 py-10 border-t border-muted max-h-fit'>

            <div className="flex flex-col gap-y-2">

                <div className="flex-center gap-x-1">

                    <Typography variant='body-sm'>
                        ساخته شده در اردیبهشت ۱۴۰۵
                    </Typography>

                </div>

                <Typography variant='caption-xs' className='text-muted-foreground text-center'>
                    تمامی حقوق این وب اپلیکیشن متعلق به درخواستی می باشد و هرگونه کپی برداری پیگرد قانونی دارد.
                </Typography>
            </div>
        </footer>
    )
}
