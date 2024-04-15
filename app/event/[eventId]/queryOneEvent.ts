import { prisma } from "@/db/prisma"

export const getEvent = async ( eventId:string) =>{

    const events = await prisma.event.findUnique({
        where: {
            id: eventId
        },
        select:{
            id: true,
            name : true,
            description : true,
            date: true,
            location:true,
            image : true,
            price: true,
            capacity: true,
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