import useClickOutside from '@/app/hooks/useOutsideClick';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'
import { Typography } from './Typography';
import { Button } from './Button';

type SelectValue<K = string | number> = {
    key: K; // Use the generic type K for the key
    label: string;
}

interface SelectProps<K> {
    values: SelectValue<K>[]
    value: SelectValue<K>;
    onChange: (value: SelectValue<K>) => void;
}

export default function Select<K>({ value, values, onChange }: SelectProps<K>) {

    const [open, setOpen] = useState(false)

    function toggle() {
        setOpen(prev => !prev)
    }

    const containerRef = useClickOutside<HTMLUListElement>(() => setOpen(false))

    function handleChange(val: SelectValue<K>) {
        onChange(val)
        setOpen(false)
    }

    return (
        <div ref={containerRef} className="relative">
            <Button
                variant='secondary'
                leftIcon={<ChevronDown className='size-4' />}
                onClick={toggle}>
                <Typography
                    variant="caption"
                >
                    {value.label}
                </Typography>

            </Button>

            {open && (
                <ul className='flex flex-col bg-secondary absolute top-full mt-1 rounded-xl divide-y divide-muted-foreground/20 shadow-sm w-full'>
                    {values.map(val => (
                        <li onClick={() => handleChange(val)} key={val.key as string | number} className='py-1 px-3 text-xs flex-center-between cursor-pointer'>
                            <Typography
                                variant="caption"
                            >
                                {val.label}
                            </Typography>
                            {val.key === value.key && (
                                <div className="size-1 rounded-full bg-success"></div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
