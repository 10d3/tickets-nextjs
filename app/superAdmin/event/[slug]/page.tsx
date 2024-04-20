"use server"
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { prisma } from "@/db/prisma";

interface PageProps {
    params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
    const event = await prisma.event.findUnique({
        where: { slug: slug },
    });


    if (!event) notFound();

    return (
        <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
            <AdminSidebar event={event} />
            <h1>{event.name}</h1>
        </main>
    );
}