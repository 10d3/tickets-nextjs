/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/classnames-order */
import EventLoad from "@/components/home/EventLoad";
import Hero from "@/components/home/Hero";
import CreateYourOwn from "@/components/home/createYourOwn";
import { eventFilterValues } from "@/components/schemas/shcemas";


interface PageProps {
  searchParams: {
    q?: string,
    eventtype?: string,
    location?: string,
  }
}

export default async function Home({searchParams:{q, eventtype, location}}:PageProps) {

  const filterValues : eventFilterValues = {
    q,
    eventtype,
    location,
  }

  const data = "Featured Events"
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pl-10 mr-10 md:pl-24 md:pr-24 ">
      <Hero />
      <EventLoad title={data} filterValues={filterValues} />
      <CreateYourOwn />
    </main>
  );
}
