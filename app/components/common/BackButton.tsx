"use client"

import { ChevronRightIcon } from 'lucide-react'
import { Button } from './Button';
import { Typography } from './Typography';
import { useSearchParams } from 'next/navigation';

interface BackButtonProps {
    url?: string;
}

export default function BackButton({ url }: BackButtonProps) {

    const searchParams = useSearchParams()
    const back_rul = searchParams.get("back_url") ?? "/"

    const target = url ? url : back_rul

    return (
        <Button
            href={target}
            className='w-fit'
            variant="ghost"
            size="sm"
            rightIcon={<ChevronRightIcon className="size-4" />}
        >
            <Typography
                className=''
                variant="caption"
            >
                بازگشت
            </Typography>
        </Button>
    )
}
