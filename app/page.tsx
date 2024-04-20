import EventLoad from "@/components/home/EventLoad";
import Hero from "@/components/home/Hero";
import CreateYourOwn from "@/components/home/createYourOwn";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {

  const data = "Featured Events"
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pl-10 mr-10 md:pl-24 md:pr-24 ">
      <Hero />
      <EventLoad title={data} />
      <CreateYourOwn />
    </main>
  );
}
