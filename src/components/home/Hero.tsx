import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import { Typography } from "../ui/typography"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function Hero() {

  const intro = `life is short. find tickets.`
  const intro2 = `enjoy events. easy.`
  return (
    <section className=" h-[90vh] flex flex-col justify-around md:pt-14 md:pb-14 items-center ">
      <div className="flex flex-col items-center">
        <Typography className=" text-4xl md:text-5xl" as="h1">{intro.toUpperCase()}</Typography>
        <Typography className=" text-4xl md:text-5xl" as="h1">{intro2.toUpperCase()}</Typography>
      </div>
      <div className=" hidden md:flex flex-col md:flex-row gap-4">
        <Input className="w-full" type="search" placeholder="Search Event, Location" />
        <Button type="submit">Search</Button>
      </div>
      <Typography as="h3" className=" hidden md:flex text-xl">FEATURED EVENTS</Typography>
    </section>
  )
}
