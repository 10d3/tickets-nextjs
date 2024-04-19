import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import React from 'react'

export default function Congrulation() {
    return (
        <div className='flex flex-col h-[70dvh] mx-6 md:mx-24 items-center justify-center gap-4'>
            <Check size={54} />
            <h1 className='text-4xl inline'>
                Felicitations
            </h1>
            <h3 className=' text-xl md:text-2xl'>
                Votre evenement a ete cree avec success
            </h3>
        </div>
    )
}
