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

interface dataType{
    name:string,
    buto1: string,
    buto2: string,
}

export default function DialogBuy({data}:dataType) {
    console.log(data)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='lg' className='w-[50%]' variant="default">{data.name}</Button>
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
                        <Button className='w-auto' variant="default">{data.buto2}</Button>
                        <Button className='w-auto' variant="default">{data.buto1}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
