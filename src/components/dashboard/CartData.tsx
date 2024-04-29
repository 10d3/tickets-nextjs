import React from 'react'
import { Card, CardContent } from '../ui/card'


export default function CartData({ title, body, footer, icon }: { title: string, body: string, footer: string, }) {
    return (
        <Card className='w-[350px]'>
            <CardContent>
                <section className="flex mt-2 items-center justify-between gap-2">
                    {/* label */}
                    <p className="text-sm">{title}</p>
                    {/* icon */}
                    {icon}
                </section>
                <section className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">{body}</h2>
                    <p className="text-xs text-gray-500">{footer}</p>
                </section>
            </CardContent>
        </Card>
    )
}
