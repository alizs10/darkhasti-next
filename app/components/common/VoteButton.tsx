import React, { ReactNode } from 'react'
import { Button } from './Button'
import { Typography } from './Typography';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface VoteButtonProps {
    icon: ReactNode
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean
    className?: string
}

export default function VoteButton({ label, icon, onClick, disabled = false, className }: VoteButtonProps) {
    return (
        <Button
            variant='ghost'
            rightIcon={icon}
            disabled={disabled}
            size="sm"
            onClick={onClick}
            className={twMerge(clsx(
                'py-0.5 px-1.5 h-auto gap-x-0.5 disabled:bg-muted',
                className,
            ))}
        >
            <Typography
                variant="caption-xs"
            >
                {label}
            </Typography>
        </Button>
    )
}
