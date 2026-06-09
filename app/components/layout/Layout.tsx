import React from 'react'
import Header from './Header'
import Footer from './Footer'
import MyToaster from '../common/MyToaster'

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className='min-h-[100dvh] flex flex-col'>
            <Header />
            {children}
            <Footer />

            <MyToaster />
        </div>
    )
}
