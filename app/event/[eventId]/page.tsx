/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable tailwindcss/classnames-order */

import React from 'react'
import { getEvent } from './queryOneEvent'
import { Typography } from '../../../src/components/ui/typography'
import { BadgeDollarSign, Calendar, Divide, Map, PersonStanding } from 'lucide-react';
import Image from 'next/image';
import generateTicketsForEvent, { generateVIPTicketsForEvent } from '@/func/ticketsGenerator';
import { convertUnixTimestamp } from '../../../src/func/formatDateFrench';
import DialogBuy from '../../../src/components/home/DialogBuy';
import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/db/prisma';

type Event = {
  id?: string;
  name?: string;
  description?: string;
  date?: Date;
  location?: string;
  image?: string | null;
  standardTicketPrice?: number;
  standardTicketCapacity?: number;
  vipTicketCapacity?: number | null;
  vipTicketPrice?: number | null;
  _count?: {
    tickets?: number; // Adjust the structure to match the data returned by getEvent
  } | undefined;
};

interface dataType {
  name: string,
  buto1: string,
  buto2: string,
}

export default async function page({ params }: { params: { eventId: string } }) {


  const events: Event = await getEvent(params.eventId);
  const date = events.date ? events.date : new Date;
  const session = await getAuthSession();
  const userId = session?.user.id
  console.log(userId)

  // console.log( await generateTicketsForEvent(events.id))

  console.log(generateTicketsForEvent)

  const tickets = await prisma.ticket.findMany({
    where:{
      eventId: events.id
    }
  })


  console.log(tickets)

  const data = events.vipTicketPrice === 0 ? [
    {
      name: 'Buy Standard ticket now',
      buto2: 'Buy with CB',
      buto1: 'Buy with Moncah',
    },
  ] : [{
    name: 'Buy Standard ticket now',
    buto1: 'Buy ticket with Moncah',
    buto2: 'Buy ticket with CB',
  },
  {
    name: 'Buy VIP ticket now',
    buto2: 'Buy VIP ticket with CB',
    buto1: 'Buy VIP ticket with Moncah',
  },]

  const { dateFormat, time } = convertUnixTimestamp(date)

  function convertTo12HourFormat(timeString: string) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const time12HourFormat = convertTo12HourFormat(time);


  const image = events.image ? events.image : '';
  const name = events.name ? events.name : ''

  // const gene = generateTicketsForEvent(events.id)
  // const geneVIp = generateVIPTicketsForEvent(events.id)

  // console.log(gene, geneVIp)


  return (
    <section className='relative w-full flex h-auto flex-col md:flex-row items-center justify-between md:pt-14 md:pr-24 md;pl-24 '>
      <div className='h-[50%] w-[100vw] md:w-[50%] md:h-full'>
        <Image src={image} priority width={0} height={0} sizes='100%' className='w-full h-full' alt={name} />
      </div>
      <div className='h-[50%] md:w-[50%] md:h-full w-full flex flex-col gap-4 p-10 md:pl-24 md:pr-24 md:justify-between'>
        <h1 className='text-4xl font-bold'>{events.name}</h1>
        <div className='flex flex-row justify-between'>
          <Typography className='flex flex-row items-center justify-center gap-1 text-[1rem] md:text-2xl'><Calendar size={18} />Time</Typography>
          <Typography variant='base' className='text-[1rem] md:text-2xl'>
            {dateFormat} {time12HourFormat}
          </Typography>
        </div>
        <div className='flex flex-row justify-between'>
          <Typography className='flex flex-row items-center justify-center gap-1 text-[1rem] md:text-2xl'><Map size={18} /> Location</Typography>
          <Typography variant='base' className='text-[1rem] md:text-2xl'>
            {events.location}
          </Typography>
        </div>
        <div className='flex flex-row justify-between'>
          <Typography className='flex flex-row items-center justify-center gap-1 text-[1rem] md:text-2xl'><PersonStanding size={18} />Capacity</Typography>
          <Typography variant='base' className='text-[1rem] md:text-2xl'>{events.standardTicketCapacity}</Typography>
        </div>
        <div className='flex flex-row justify-between'>
          <Typography className='flex flex-row items-center justify-center gap-1 text-[1rem] md:text-2xl'><BadgeDollarSign size={18} /> Standard Price</Typography>
          <Typography variant='base' className='text-[1rem] md:text-2xl'>{events.standardTicketPrice} Gdes</Typography>
        </div>
        {events.vipTicketCapacity &&
          (<div className='flex flex-row justify-between'>
            <Typography className='flex flex-row items-center justify-center gap-1 text-[1rem] md:text-2xl'><PersonStanding size={18} />VIP Capacity</Typography>
            <Typography>{events.vipTicketCapacity}</Typography>
          </div>)
        }
        {events.vipTicketPrice &&
          (<div className='flex flex-row justify-between'>
            <Typography className='flex flex-row items-center justify-center gap-1 text-[1rem] md:text-2xl'><BadgeDollarSign size={18} /> VIP Price</Typography>
            <Typography variant='base'>{events.vipTicketPrice} Gdes</Typography>
          </div>)
        }
        <div>
          <Typography variant='h2' className='text-2xl '>Description</Typography>
          <Typography variant='p'>{events.description}</Typography>
        </div>
        <div>
          maps
        </div>
        <div className='w-full mt-6 flex items-center justify-center gap-2'>
          {data.map((dat, i) => (
            <DialogBuy key={i} userId={userId} events={tickets} data={dat} />
          ))}

          {/* <Button size='lg' className='w-[50%]' variant="default">Buy Standard Now</Button> */}
          {/* <Button size='lg' className='w-[50%]' variant="default">Buy VIP Now</Button> */}
        </div>
      </div>
    </section>
  )
}
