import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function CreateYourOwn() {
    return (
        <div className='flex flex-col items-center justify-center gap-2 my-8'>
            <h1 className='text-3xl md:text-6xl'>Make your own event</h1>
            <p className='text-[1rem] md:text-4xl text-justify' >Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <Button><Link href='/create-event'>Create your event</Link></Button>
        </div>
    )
}
