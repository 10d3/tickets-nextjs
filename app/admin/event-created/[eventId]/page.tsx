import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/layout/layout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { prisma } from '@/db/prisma';
import { getRequireAuthSession } from '@/lib/auth'
import { AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getEvent } from './event.query';

export default async function ListEvent({params}:{params:{eventId: string}}) {

    const session = await getRequireAuthSession();

    const events = await getEvent(params.eventId, session.user.id)

    console.log({events})


    return (
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
                            </TableBody>
                        </Table>
                        {events._count?.tickets}
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    )
}
