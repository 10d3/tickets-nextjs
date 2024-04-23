/* eslint-disable tailwindcss/classnames-order */

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuthSession, getRequireAuthSession } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { LogoutButton } from '@/features/auth/LogoutButton';
import { prisma } from '@/db/prisma';

export default async function AccountPage() {
    const session = await getRequireAuthSession();
    const user = session?.user;


    const userPri = await prisma.user.findUnique({
        where:{id:user.id},
        select:{superAdmin:true}
    })

    const isSuperAdmin:boolean | undefined = userPri?.superAdmin

    const events = await prisma.event.findMany({
        where: {
            createdById: user?.id
        }
    })

    const tickets = await prisma.ticket.findMany({
        where: {
            userId: user?.id
        }
    })


    if (!session) {
        throw new Error("no session found");
    }
    return (
        <main className='md:flex md:justify-center'>
        <Card className='mx-5 md:mx-24 min-w-lg mt-20 md:w-[450px]  '>
            <CardHeader className='flex flex-row gap-4'>
                <Avatar>
                    <AvatarFallback>
                        {session.user?.name?.[0]}
                    </AvatarFallback>
                    {session.user?.image && (<AvatarImage src={session.user.image} alt={session.user.name ?? "user image"} />)}
                </Avatar>
                <div className='flex flex-col gap-1'>
                    <CardTitle>{session.user.name}</CardTitle>
                    <CardDescription>{session.user.email}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
                <Link href='/account/setting' className={buttonVariants({ variant: "outline", size: "lg" })}>Setting</Link>
                <Link href='/admin' className={buttonVariants({ variant: "outline", size: 'lg' })}>Admin</Link>
                {isSuperAdmin != false && <Link href='/superAdmin' className={buttonVariants({ variant: "outline", size: 'lg' })}>Super Admin</Link>}
                {events.length != 0 && <Link href='/dashboard' className={buttonVariants({ variant: "outline", size: 'lg' })}>DashBoard</Link>}
                {tickets.length != 0 && <Link href='/tickets' className={buttonVariants({ variant: "outline", size: 'lg' })}>Mes Tickets</Link>}
            </CardContent>
            <CardFooter className='flex flex-row-reverse'>
                <LogoutButton />
            </CardFooter>
        </Card>
        </main>
    )
}