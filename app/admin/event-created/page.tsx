import { DeleteJobButton } from '@/components/home/DeleteEvButton';
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/layout/layout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { prisma } from '@/db/prisma';
import { getRequireAuthSession } from '@/lib/auth'
import { AvatarImage } from '@radix-ui/react-avatar';
import { FilePenLine, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'

export default async function AdminEvent() {


    const session = await getRequireAuthSession();

    const events = await prisma.event.findMany({
        where: {
            createdById: session.user.id
        }
    })
    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>
                    Events
                </LayoutTitle>
            </LayoutHeader>
            <LayoutContent>
                <Card>
                    <CardContent className='mt-4'>
                        <Table>
                            {/* <TableHeader>
                                <div>
                                    <TableHead>
                                        Image
                                    </TableHead>
                                    <TableHead>
                                        Name
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </div>
                            </TableHeader> */}
                            <TableBody>
                                {events.map(event => (
                                    <TableRow className='flex flex-row justify-between items-center' key={event.id}>
                                        <TableCell>
                                            <Avatar className='rounded'>
                                                <AvatarFallback>
                                                    {event.name[0]}
                                                </AvatarFallback>
                                                {/* {event.image && <AvatarImage src={event.image} alt={event.name} />} */}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Typography as={Link} variant='large' href={`/admin/event-created/${event.id}`}>{event.name}</Typography>
                                        </TableCell>
                                        <TableCell className='flex flex-row gap-4'>
                                            <DeleteJobButton jobId={event.id}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    )
}
