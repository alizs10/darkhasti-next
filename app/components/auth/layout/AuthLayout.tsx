import React from 'react'
// import AuthHeader from './AuthHeader'
import MyToaster from '../../common/MyToaster'
import Header from '../../layout/Header'
import Layout from '../../layout/Layout'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (

        <Layout>
            <main className="flex-1 flex justify-center mt-30 sm:mt-40 md:mt-60">
                {children}
            </main>
        </Layout>
    )
}
