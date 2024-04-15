'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Typography } from '../ui/typography';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { formatDateFrench } from '@/func/formatDateFrench';
import Link from 'next/link';

export default function CardEvent({ id, name, description, date, location, price, image, capacity, createdById } : { id: string, name: string, description: string, date: Date, location: string, price: number, image: string, capacity: number, createdById: string }) {

    const { dateFormat, time } = formatDateFrench(date)


    return (
        <Card className='w-[350px] h-[430px]'>
            <CardHeader>
                <Image width={300} height={300} src={image} alt='dj flash' />
            </CardHeader>
            <CardContent>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
                <div className=' mt-1 mb-1 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <Typography as='h2'>{dateFormat}</Typography>
                        <Typography as='h2'>{time}</Typography>
                    </div>
                    <div className='flex justify-between'>
                        <Typography as='h2'>{location}</Typography>
                        <Badge variant='destructive' ><Typography as='h2'>{price} GDES</Typography></Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter className=' flex justify-between'>
                <Button>Buy Now</Button>
                <Typography as={Link} variant='large' href={`/event/${id}`}>Read More</Typography>
            </CardFooter>
        </Card>
    );
}
