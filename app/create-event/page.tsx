import AccordionDemo from '@/components/home/AccordionDemo';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getAuthSession } from '@/lib/auth';
import Image from 'next/image';
import React from 'react'

export default async function CreateEvent() {

    const intro = 'Creer votre billettrie en ligne en quelques clics'
    const intro2 = 'Billettrie & Inscription'
    const intro3 = 'Créez votre billetterie en ligne personnalisée, gérez simplement vos inscriptions, gagnez du temps et offrez une expérience mémorable à vos participants!'

    const session = await getAuthSession();

    if (!session) {
        throw new Error("no session found");
    }


    return (
        <div className=' flex flex-col items-center pl-7 pr-7 pt-10 md:p-24 gap-8'>
            <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex flex-col gap-4 md:gap-0 justify-between '>
                    <Typography as='h1' className=' text-4xl md:text-6xl '>{intro}</Typography>
                    <Typography as='h3' className=' text-2xl md:text-4xl text-justify'>{intro2}</Typography>
                    <Typography as='p' className=' text-xl md:text-2xl text-justify'>{intro3}</Typography>
                    <Button size='lg' className=' self-start md:self-center' variant='default'>Create Event</Button>
                </div>
                <div>
                    <Image src='/heroimg.jpg' width={0} height={0} sizes='100%' className='w-full h-full rounded-lg' alt='create your event' />
                </div>
            </div>
            <div className=' w-full flex flex-col md:flex-row'>
                <div className='w-full flex flex-col md;w-[50%] gap-2'>
                    <Typography as='h1' className='text-2xl md:text-4xl'>La solution de billetterie à portée de tous.</Typography>
                    <Typography as='p' className='text-xl md:text-2xl text-justify'>Découvrez la plateforme de billetterie conçue pour simplifier votre expérience et celle de vos participants :</Typography>
                </div>
                <div className='w-full md:w-[50%]'>
                    <AccordionDemo />
                </div>
            </div>
        </div>
    )
}
