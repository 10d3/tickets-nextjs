"use server";
import { EventSchema } from "@/components/schemas/shcemas";
import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import path from "path";
import { getRequireAuthSession } from "@/lib/auth";

export async function createEventPosting(formData: FormData, user1, data) {
  // const session = await getRequireAuthSession();
  // const user = session?.user.id

  console.log(user1);

  const values = Object.fromEntries(formData.entries());
  console.log(data.toISOString());

  const {
    name,
    description,
    location,
    image,
    vipTicketPrice,
    standardTicketPrice,
    vipTicketCapacity,
    standardTicketCapacity,
  } = EventSchema.parse(values);

  const slug: string = `${toSlug(name)}-${nanoid(10)}`;

  let eventFlyerUrl: string | undefined = undefined;

  if (image) {
    // Stockez le flyer de l'événement en tant que blob
    const blob = await put(
      `event_flyer_${slug}${path.extname(image.name)}`,
      image,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    eventFlyerUrl = blob.url;
  }

  await prisma.event.create({
    data: {
      name: name.trim(),
      slug,
      description: description.trim(),
      date: data.toISOString(),
      location,
      image: eventFlyerUrl,
      vipTicketPrice,
      standardTicketPrice,
      vipTicketCapacity,
      standardTicketCapacity,
      createdById: user1,
    },
  });

  redirect("/event-created-succefull");
}
