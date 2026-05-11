import ProtectedLayout from '@/app/components/layout/ProtectedLayout';
import React from 'react'

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedLayout>
            {children}
        </ProtectedLayout>
    )
}
