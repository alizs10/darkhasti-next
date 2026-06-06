import React from 'react'
import AuthHeader from './AuthHeader'
import MyToaster from '../../common/MyToaster'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (

        <div className='flex h-full flex-col'>

            <AuthHeader />

            <main className="flex-1 flex-center mt-30 sm:mt-40 md:mt-60">
                {children}
            </main>

            <MyToaster />

        </div>
    )
}
