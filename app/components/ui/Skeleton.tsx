// app/components/ui/Skeleton.tsx
import { cn } from '@/app/lib/utils'; // Adjust the path to where you created the cn function
import React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            // cn() will remove 'rounded-md' if you pass 'rounded-full' in className!
            className={cn('animate-pulse rounded-md bg-secondary-foreground/10', className)}
            {...props}
        />
    );
}