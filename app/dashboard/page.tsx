import CartData from '@/components/dashboard/CartData'
import { Button } from '@/components/ui/button';
import { getRequireAuthSession } from '@/lib/auth'
import React from 'react'

export default async function page() {

  const session = await getRequireAuthSession();
  const user = session.user.name;

  return (
    <div className='w-[100%] md:w-auto flex items-center flex-col justify-center gap-4 px-6'>
      <div className='flex md:flex-row flex-col justify-between w-[90%] gap-4'>
        <div className='flex justify-center items-center'>
          <h1>Welcome back {user} </h1>
        </div>
        <div className='flex flex-row gap-2'>
          <Button className='w-[50%]'>Create new Event</Button>
          <Button className='w-[50%]'>Virement</Button>
        </div>
      </div>
      <div className='flex flex-col w-[90%] justify-center items-center md:flex-row gap-4'>
        <CartData title='Total Sales' body='1000' footer='la vida' />
        <CartData title='Total revenue' body='6000' footer='la vida' />
        <CartData title='Total revenue net' body='5300' footer='la vida' />
      </div>
    </div>
  )
}
