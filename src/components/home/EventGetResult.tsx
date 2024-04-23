import { prisma } from "@/db/prisma";
import { eventFilterValues } from "../schemas/shcemas";


interface EventResultProps {
    filterValues: eventFilterValues,
}
export async function getServerSideProps({ filterValues }: EventResultProps) {

    'use server'
    const { q, eventtype, location } = filterValues || {};
    console.log(location)
    const searchString = q?.split(" ").filter((word) => word.length > 0).join(" & ")
    console.log(searchString)
    const searchFilter = searchString ? {
        OR: [
            { name: { search: searchString } },
            { eventType: { search: searchString } },
            { location: { search: searchString } },
        ]
    } : {};

    const where = {
        AND: [
            searchFilter,
            eventtype ? { eventType : eventtype } : {},
            location ? { location } : {},
            { approved: true }
        ]
    }

    try {
        const events = await prisma.event.findMany({
            where,
            orderBy: {
                date: "desc",
            }
        });
        // console.log('Événements récupérés:', events); // Ajoutez cette ligne pour le débogage

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

