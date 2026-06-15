import { sliceText } from '@/app/helpers'
import clsx from 'clsx';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import { Typography } from './Typography';

interface AvatarProps {
    username: string;
    className?: string;
}

export default function Avatar({ username, className }: AvatarProps) {
    return (
        <div className={twMerge(clsx('size-10 rounded-full bg-secondary flex-center', className))}>
            <Typography variant='h4' weight='extrabold' className='text-muted-foreground'>
                {sliceText(username, 1, false).toUpperCase()}
            </Typography>
        </div>
    )
}
