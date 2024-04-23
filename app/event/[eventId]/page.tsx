/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable tailwindcss/classnames-order */

import React from 'react'
import { getEvent } from './queryOneEvent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Calendar, Map } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import generateTicketsForEvent from '@/func/ticketsGenerator';


type Event = {
  id?: string;
  name?: string;
  description?: string;
  date?: Date;
  location?: string;
  image?: string | null;
  standardTicketPrice?: number;
  standardTicketCapacity?: number;
  vipTicketCapacity?: number | null; // Updated to allow null
  vipTicketPrice?: number;
  _count?: {
      select: {
          tickets: number;
      };
  };
};

export default async function page({params}:{params:{eventId: string}}) {

  const events:Event = await getEvent(params.eventId);

  const gene = generateTicketsForEvent(events.id)

  // console.log(gene)


  return (
    <section className='relative w-full flex h-dvh flex-col md:flex-row items-center justify-between md:pt-14 md:pr-24 md;pl-24 '>
        <div className='h-[50%] w-[100vw] md:w-[50%] md:h-full'>
          <Image src={events?.image} width={0} height={0} sizes='100%' className='w-full h-full' alt={events?.name} />
        </div>
        <div className='h-[50%] md:w-[50%] md:h-full w-full flex flex-col gap-4 p-10 md:pl-24 md:pr-24 md:justify-between'>
          <Typography variant="h1">{events.name}</Typography>
          <div>
            <Calendar/>
          </div>
          <div className='flex flex-row justify-between'>
            <Map/>
            {events.location}
          </div>
          <div>
            <Typography variant='h2' className='text-xl '>Description</Typography>
            <Typography variant='p'>{events.description}</Typography>
          </div>
          <div className='w-full mt-6 flex items-center justify-center'>
            <Button size='lg' className='w-[80%]' variant="default">Buy Now</Button>
          </div>
        </div>
    </section>
  )
}
