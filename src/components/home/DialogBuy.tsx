/* eslint-disable tailwindcss/classnames-order */
'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { loadStripe } from '@stripe/stripe-js';
import { env } from '@/lib/env';
import Checkout from './Checkout';

interface dataType {
    name: string,
    buto1: string,
    buto2: string,
}


export default function DialogBuy({ data, events, userId }: { data: dataType, events: any, userId: string }) {
    // const eventsStandard = {
    //     id: 'clvgzzofg00nzuec6ard6u1gz',
    //     name: "Justice League Snyder Cut's",
    //     standardTicketPrice: 500,
    //     standardTicketCapacity: 300,
    //     // vipTicketCapacity: 50,
    //     // vipTicketPrice: 1000,
    //   }


        console.log(events)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='lg' className='w-1/2 bg-green-700' variant="default">{data.name}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[22rem] md:max-w-auto md:min-w-[350px]">
                <DialogHeader>
                    <DialogTitle>Payer avec</DialogTitle>
                    <DialogDescription>
                        MonCash | CB | CD | Paypal | GPay
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-row gap-2 items-center justify-center'>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <Button type='submit' role='link' className='w-auto bg-green-700' variant="default">{data.buto2}</Button>
                        <Checkout events={events} userId={userId} />
                        <Button className='w-auto bg-green-700' variant="default">{data.buto1}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
