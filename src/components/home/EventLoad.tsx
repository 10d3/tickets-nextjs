import React from 'react';
import { prisma } from '@/db/prisma';
import CardEvent from './CardEvent';
import { Skeleton } from '../ui/skeleton';
import { Typography } from '../ui/typography';
import EventFilterSidebar from './EventFilterSidebar';

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

export default async function EventLoad({ title }: string) {

    console.log(title)

    const events = await getServerSideProps();
    console.log(events.events)

    if (events.events?.length === 0) {
        return <div className="flex flex-col space-y-3 pb-6 items-center justify-center">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>;
    }

    return (
        <section>
            <div className=' mb-4 flex items-center justify-center'>
                <h1 className='text-4xl' >{title}</h1>
            </div>
            <EventFilterSidebar />
            <div className='flex flex-col mt-6 justify-center items-center gap-6'>
                <div className='flex flex-col md:flex-row gap-4'>
                    {events.events?.map((event) => (
                        <CardEvent key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export async function getServerSideProps() {
    try {
        const events = await prisma.event.findMany({
            where: {
                approved: true,
            },
            orderBy: {
                date: "desc",
            }
        });
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

