/* eslint-disable tailwindcss/classnames-order */
import CardEvent from "@/components/home/CardEvent";
import { prisma } from "@/db/prisma";
import { getRequireAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function AdminPage() {
    const unapprovedEvents = await prisma.event.findMany({
        where: { approved: false },
    });

    const session = await getRequireAuthSession();

    const user = session?.user.id;

    const userPri = await prisma.user.findUnique({
        where:{id:user},
        select:{superAdmin:true}
    })


    if ( !user || !userPri?.superAdmin ) {
      return(<h1>va la bas</h1>)
    }

    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <main className="m-auto my-10 max-w-5xl space-y-10 px-3 flex flex-col justify-center items-center">
            <h1 className="text-center"> SuperAdmin Dashboard</h1>
            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">Unapproved Events:</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    {unapprovedEvents.map((event) => (
                        <Link key={event.id} href={`/superAdmin/event/${event.slug}`} className="block">
                            <CardEvent {...event} />
                        </Link>
                    ))}
                    {unapprovedEvents.length === 0 && (
                        <p className="text-muted-foreground">No unapproved jobs</p>
                    )}
                </div>
            </section>
        </main>
    );
}