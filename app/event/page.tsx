/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/classnames-order */
import EventLoad from '@/components/home/EventLoad'
import { Typography } from '@/components/ui/typography'
import React from 'react'

export default function page() {

    const data = 'Tous les evenements'
  return (
    <div className=' flex items-center pl-7 pr-7 pt-10 md:p-14 gap-8'>
        <EventLoad title = {data} />
    </div>
  )
}
