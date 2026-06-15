import { ReactNode } from 'react'
import MyToaster from '../common/MyToaster'
import Header from './Header'
import Logo from '../common/Logo'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='min-h-[100dvh] flex flex-col'>

            <Header />
            {children}


            <MyToaster />
        </div>
    )
}
