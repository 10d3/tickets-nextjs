import React from 'react';
import { prisma } from '@/db/prisma';
import CardEvent from './CardEvent';
import { Skeleton } from '../ui/skeleton';
import { Typography } from '../ui/typography';

// interface Event {
//     id: string;
//     name: string;
//     description: string;
//     date: Date;
//     location: string;
//     price: number;
//     image?: string;
//     capacity: number;
//     tickets: any[]; // Mettez le type approprié des tickets ici
//     createdBy: any; // Mettez le type approprié du créateur ici
//     createdById: string;
// }

// interface Props {
//     events: Event[];
// }

export default async function EventLoad({title}:string) {

    console.log(title)

    const events = await getServerSideProps();
    console.log(events.events)

    if (!events) {
        return <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>;
    }

    return (
        <div className='flex flex-col justify-center items-center gap-6'>
            <Typography variant='h2'>{title}</Typography>
            <div className='flex flex-col md:flex-row gap-4'>
                {events.events?.map((event) => (
                    <CardEvent key={event.id} {...event} />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const events = await prisma.event.findMany();
        console.log('Événements récupérés:', events); // Ajoutez cette ligne pour le débogage

        return {
            events,
        };
    } catch (error) {
        console.error('Erreur lors du chargement des événements :', error);
        return {
            props: {
                events: [],
            },
        };
    }
}

