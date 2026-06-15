import React from 'react'
import Footer from './Footer'
import Layout from './Layout'

export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <Layout>
            {children}
            <Footer />
        </Layout>
    )
}
