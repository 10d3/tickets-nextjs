import { z } from "zod";

// Schéma Zod pour les données d'événement

const imageFlyer = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const amount = z.string().transform((v) => Number(v) || 0);

export const EventSchema = z.object({
  name: z.string().min(1, "required").max(255), // Nom de l'événement
  // slug: z.string().min(1),
  description: z.string().min(1).max(2000), // Description de l'événement
  date: z.string().transform((value) => new Date(value)),
  //  z
  //   .string()
  //   .transform(Date.parse)
  //   .refine((date) => !isNaN(date), {
  //     message: "Invalid date format",
  //   }), // Date de l'événement (format ISO 8601)
  location: z.string().min(1), // Lieu de l'événement
  // price: amount, // Prix de l'événement
  image: imageFlyer.optional(), // Flyer de l'evenement
  vipTicketPrice: amount.optional(), // z.number().min(0).optional()
  standardTicketPrice: amount, // z.number().min(0).optional()
  vipTicketCapacity: amount.optional(), // z.number().min(0).optional(),
  standardTicketCapacity: amount, // z.number().min(0),
});

export type EventValues = z.infer<typeof EventSchema>;
