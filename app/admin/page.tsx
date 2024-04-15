import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/layout/layout'
import Link from 'next/link'
import React from 'react'

export default function AdminPage() {
    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Events</LayoutTitle>
            </LayoutHeader>
            <LayoutContent>
                <Link href='/admin/event-created'> Liset des Evennements </Link>
            </LayoutContent>
        </Layout>
    )
}
