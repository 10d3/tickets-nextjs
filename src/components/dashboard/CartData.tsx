import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'


export default function CartData({ title, body, footer }: { title: string, body: string, footer: string }) {
    return (
        <Card className='w-[350px]'>
            <CardContent>
                <section className="flex justify-between gap-2">
                    {/* label */}
                    <p className="text-sm">{title}</p>
                    {/* icon */}
                    {/* <props.icon className="h-4 w-4 text-gray-400" /> */}
                </section>
                <section className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">{body}</h2>
                    <p className="text-xs text-gray-500">{footer}</p>
                </section>
            </CardContent>
        </Card>
    )
}
