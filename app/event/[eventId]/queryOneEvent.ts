import { prisma } from "@/db/prisma"

export const getEvent = async ( eventId:string) =>{

    const events = await prisma.event.findUnique({
        where: {
            slug: eventId
        },
        select:{
            id: true,
            name : true,
            description : true,
            date: true,
            location:true,
            image : true,
            standardTicketPrice: true,
            standardTicketCapacity: true,
            vipTicketCapacity: true,
            vipTicketPrice: true,
            _count:{
                select:{
                    tickets: true,
                }
            }
        },
    })

    return{
        ...events
    }

}