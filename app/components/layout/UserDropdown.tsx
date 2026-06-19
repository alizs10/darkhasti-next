'use client'

import useClickOutside from '@/app/hooks/useOutsideClick';
import { Session } from 'next-auth';
import { useState } from 'react'
import { Button } from '../common/Button';
import { Typography } from '../common/Typography';
import { LogOutIcon, TablePropertiesIcon, UserIcon } from 'lucide-react';
import { logoutHandler } from '../my/Logout';
import { useRouter } from 'next/navigation';


interface UserDropdownProps {
    user: Partial<Session>['user']
}

const dropdownItems = [
    {
        id: '1',
        label: 'پروفایل کاربری',
        url: '/my',
        icon: <UserIcon className='size-3.5' />
    },
    {
        id: '2',
        label: 'درخواست‌های من',
        url: '/my/requests',
        icon: <TablePropertiesIcon className='size-3.5' />
    },
]

export default function UserDropdown({ user }: UserDropdownProps) {

    const [open, setOpen] = useState(false)

    const router = useRouter()

    function toggle() {
        setOpen(prev => !prev)
    }

    const containerRef = useClickOutside<HTMLUListElement>(() => setOpen(false))

    function closeDropdownWrapper(cb: () => void) {

        setOpen(false)
        cb()

    }


    return (
        <div ref={containerRef} className="relative z-50">
            <Button onClick={toggle} variant='ghost' size='md'
                className={`hover:bg-primary hover:text-primary-foreground ${open ? 'bg-secondary' : ''}`}
            >
                <Typography variant="caption" weight='medium'>
                    سلام، {user?.username
                    }
                </Typography>

            </Button>

            {open && (
                <ul className='flex flex-col justify-start bg-background border border-secondary absolute top-full right-0 h-fit mt-4 rounded-2xl overflow-clip divide-y divide-secondary shadow-sm'>
                    {dropdownItems.map(item => (
                        <li key={item.id}>
                            <Button
                                variant='ghost'
                                size='sm'
                                // href={item.url}
                                onClick={() => {
                                    closeDropdownWrapper(() => router.push(item.url))
                                }}
                                rightIcon={item.icon}
                                className='w-full justify-start rounded-none py-1 px-4 text-xs flex-center-between cursor-pointer'>

                                <Typography
                                    className='text-nowrap'
                                    variant="caption-xs"
                                >
                                    {item.label}
                                </Typography>
                            </Button>
                        </li>
                    ))}

                    <li>
                        <Button
                            onClick={() => closeDropdownWrapper(logoutHandler)}
                            variant='ghost-destructive' size='sm'
                            rightIcon={<LogOutIcon className='size-3.5' />}
                            className='w-full justify-start rounded-none py-1 px-4 text-xs flex-center-between text-destructive cursor-pointer'>

                            <Typography
                                className='text-nowrap'
                                variant="caption-xs"
                            >
                                خروج از حساب کابری
                            </Typography>
                        </Button>
                    </li>
                </ul>
            )}
        </div>
    )
}
