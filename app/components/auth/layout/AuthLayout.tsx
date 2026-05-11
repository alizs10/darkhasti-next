import React from 'react'
import AuthHeader from './AuthHeader'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (

        <div className='flex h-full flex-col min-h-[100dvh]'>

            <AuthHeader />

            <main className="flex-1 flex-center">
                {children}
            </main>

        </div>
    )
}
