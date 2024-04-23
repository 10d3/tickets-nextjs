/* eslint-disable tailwindcss/classnames-order */
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/layout/layout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { prisma } from '@/db/prisma';
import { getRequireAuthSession } from '@/lib/auth'
import { AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getEvent } from './event.query';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import EditEventForm from '../../../create-event/new/EditingEventForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';


export default async function ListEvent({ params }: { params: { eventId: string } }) {

    const session = await getRequireAuthSession();

    const events = await getEvent(params.eventId, session.user.id)

    console.log({ events })


    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
            <div>
                <Layout>
                    <LayoutHeader>
                        <LayoutTitle>
                            {events.name}
                        </LayoutTitle>
                    </LayoutHeader>
                    <LayoutContent>
                        <Card>
                            <CardContent className='mt-4'>
                                <Table>
                                    <TableHeader>
                                        <TableHead>
                                            Image
                                        </TableHead>
                                        <TableHead>
                                            {events.name}
                                        </TableHead>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Avatar className='rounded'>
                                                    <AvatarFallback>
                                                        {events.name[0]}
                                                    </AvatarFallback>
                                                    {/* {events.image && <AvatarImage src={events.image} alt={events.name} />} */}
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>
                                                <Typography as={Link} variant='large' href={`/admin/event-created/${events.id}`}>{events.name}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                {events._count?.tickets} Tickets
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{events.description}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </LayoutContent>
                </Layout>
            </div>
            <div>
                <Card>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='outline'>Edit Event</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <EditEventForm events={events} />
                        </DialogContent>
                    </Dialog>
                </Card>
            </div>
        </div>
    )
}
