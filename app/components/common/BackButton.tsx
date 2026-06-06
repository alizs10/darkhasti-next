import { ChevronRightCircleIcon, ChevronRightIcon, MoveRightIcon } from 'lucide-react'
import Link from 'next/link';
import { Button } from './Button';
import { Typography } from './Typography';

interface BackButtonProps {
    url: string;
}

export default function BackButton({ url }: BackButtonProps) {

    return (
        <Button
            href={url}
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
