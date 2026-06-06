"use client"

import { PenLineIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { Button } from './Button';

interface EditButtonProps {
    url: string;
    // back_url: string;
}

export default function EditButton({ url }: EditButtonProps) {

    const router = useRouter()
    const pathname = usePathname()

    function handleClick(e: MouseEvent<HTMLButtonElement>) {

        e.preventDefault()
        e.stopPropagation()

        router.push(url + "?back_url=" + pathname)

    }


    return (
        <Button variant='ghost-warning' size='icon-xs' onClick={handleClick} type='button'
        >
            <PenLineIcon className="size-3" />
        </Button>
    )
}
