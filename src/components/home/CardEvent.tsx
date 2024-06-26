/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/classnames-order */
'use client'
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Typography } from '../ui/typography';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import heroimg from "../../../public/heroimg.jpg"
import { convertUnixTimestamp } from "../../func/formatDateFrench"

interface CardEventProps {
    id: string;
    slug: string;
    name: string;
    description: string;
    date: Date;
    location: string;
    standardTicketPrice: number;
    image: string | null; // Allow null for image
    standardTicketCapacity: number;
    createdById: string;
}

export default function CardEvent({ id, slug, name, description, date, location, standardTicketPrice, image, standardTicketCapacity, createdById }: CardEventProps) {

    const { dateFormat, time } = convertUnixTimestamp(date)

    function convertTo12HourFormat(timeString: string) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    const time12HourFormat = convertTo12HourFormat(time);

    // const myLoader = ({ src, width }) => {
    //     return `${src}?w=${width}`;
    // }


    return (
        <Card className='w-[350px] h-auto'>
            <CardHeader>
                <div className='w-[300px] m-auto'>
                <Image className='w-full h-[330px] rounded-md' width={500} height={500} src={image ? image : heroimg} alt='dj flash' />
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription className=' line-clamp-1'>
                    {description}
                </CardDescription>
                <div className=' mt-1 mb-1 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <Typography as='h2'>{dateFormat}</Typography>
                        <Typography as='h2'>{time12HourFormat}</Typography>
                    </div>
                    <div className='flex justify-between'>
                        <Typography as='h2'>{location}</Typography>
                        <Badge variant='destructive' ><Typography as='h2'>{standardTicketPrice} GDES</Typography></Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter className=' flex justify-between'>
                <Button>Buy Now</Button>
                <Typography as={Link} variant='large' href={`/event/${slug}`}>Read More</Typography>
            </CardFooter>
        </Card>
    );
}
