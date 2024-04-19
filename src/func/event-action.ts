'use server'

import { prisma } from "@/db/prisma";

export const creationEventAction = async () => {};


export const editEventAction = async () => {};


export const deleteEventAction = async ({ eventID }:string) => {
    try{
        await prisma.event.delete({
            where:{
                id : eventID,
            }
        })
        return "succes"
    }catch(error){
        return error
    }
};