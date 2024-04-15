import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Typography } from '../ui/typography'

export default function AccordionDemo() {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <Typography as='h1' className='text-xl'>
                        Is it accessible?
                    </Typography>
                </AccordionTrigger>
                <AccordionContent>
                    <Typography as='p'>Yes. It adheres to the WAI-ARIA design pattern.</Typography>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <Typography as='h1' className='text-xl'>Is it styled?
                    </Typography>
                </AccordionTrigger>
                <AccordionContent>
                    <Typography as='p'>Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </Typography>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>
                    <Typography as='h1' className='text-xl'>
                        Is it animated?
                    </Typography>
                </AccordionTrigger>
                <AccordionContent>
                    <Typography as='p'>
                        Yes. It's animated by default, but you can disable it if you prefer.
                    </Typography>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
