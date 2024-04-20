"use server"

import { prisma } from "@/db/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


type FormState = { error?: string } | undefined;

export async function deleteEventAction(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    try {
      const eventId = formData.get("jobId") as string;


      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });
      if (event?.image) {
        await del(event.image);
      }

      await prisma.event.delete({
        where: {
          id: eventId,
        },
      });
      revalidatePath("/");
    } catch (error) {
      let message = "Unexpected error";
      if (error instanceof Error) {
        message = error.message;
      }
      return { error: message };
    }

    redirect("/admin/event-created");
  }