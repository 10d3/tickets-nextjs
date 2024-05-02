/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable tailwindcss/classnames-order */
import BarChart from '@/components/dashboard/Barchart';
import CartData from '@/components/dashboard/CartData'
import EventCard from '@/components/dashboard/EventCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/db/prisma';
import { getRequireAuthSession } from '@/lib/auth'
import { CreditCard, DollarSign, Ticket, Users } from 'lucide-react';

export default async function page() {

  const session = await getRequireAuthSession();
  const user = session.user;

  const events = await prisma.event.findMany({
    where: {
      createdById: user.id,
    }
  })

  console.log(events)


  const cardData: CardProps[] = [
    {
      label: "Total Revenue",
      amount: "$45,231.89",
      discription: "+20.1% from last month",
      icon: <DollarSign className="size-4 text-gray-400" />
    },
    {
      label: "Subscriptions",
      amount: "+2350",
      discription: "+180.1% from last month",
      icon: <Users className="size-4 text-gray-400" />
    },
    {
      label: "Sales",
      amount: "+12,234",
      discription: "+19% from last month",
      icon: <CreditCard className="size-4 text-gray-400" />
    },
  ];

  return (
    <div className='w-[100%] md:w-auto flex items-center flex-col justify-center gap-4'>
      <section className='flex md:flex-row flex-col justify-between w-full md:w-[80%] gap-4'>
        <div className='flex justify-center items-center'>
          <h1>Welcome back {user.name} </h1>
        </div>
        <div className='flex flex-row gap-2'>
          <Button className='w-[50%]'>Create new Event</Button>
          <Button className='w-[50%]'>Virement</Button>
        </div>
      </section>
      <section className='flex flex-col w-full md:w-[80%] justify-between items-center md:flex-row gap-4'>
        {cardData.map((d, i) => (
          <CartData
            key={i}
            body={d.amount}
            footer={d.discription}
            icon={d.icon}
            title={d.label}
          />
        ))}
      </section>
      <section className='flex flex-col md:flex-row w-full justify-between items-center md:w-[80%] gap-4'>
        <Card className='w-full md:w-1/2'>
          <CardContent>
            <p className="p-4 font-semibold">Overview</p>
            <BarChart />
          </CardContent>
        </Card>
        <Card className='w-full md:w-1/2 h-[27rem]'>
          <CardContent className="flex flex-col justify-between gap-2">
            <p className="p-4 font-semibold">Recent Events list</p>
            {events.map(event => (
              <EventCard event={event} />
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
