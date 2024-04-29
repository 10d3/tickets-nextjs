import { eventTypes } from "@/lib/event-type";
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
  eventType: z
    .string()
    .min(1)
    .refine((value) => eventTypes.includes(value), "Invalid event type"),
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

export const eventFilterSchema = z.object({
  q: z.string().optional(),
  eventtype: z.string().optional(),
  location: z.string().optional(),
});

export type eventFilterValues = z.infer<typeof eventFilterSchema>;

// const imageFlyerEdit = z
//   .custom<File | string>()
//   .refine(
//     (file) => !file || (file instanceof File && file.type.startsWith("image/")),
//     "Must be an image file"
//   )
//   .refine((file) => {
//     return !file || file.size < 1024 * 1024 * 2;
//   }, "File must be less than 2MB");

// const isImageFile = (file: File | string): boolean => {
//   if (typeof file === "string") {
//     // Assuming string is a valid URL, you might want to add more validation here
//     return true;
//   }
//   return file instanceof File && file.type.startsWith("image/");
// };

// const isValidFileSize = (file: File): boolean => {
//   return file.size < 1024 * 1024 * 2; // File must be less than 2MB
// };

// const imageFlyerEdit = z
//   .custom<File | string>((value) => isImageFile(value))
//   .refine((value) => {
//     if (typeof value === "string") {
//       return true; // URL is valid
//     }
//     return isValidFileSize(value); // File is valid
//   }, "Invalid image file or URL. Must be an image file or a valid URL");

  const isValidDateString = (value: string): boolean => {
    // You can add custom validation logic for the string format if needed
    return true;
  };

  const toNumber = (value: string | number): number => {
    return typeof value === 'string' ? parseFloat(value) : value;
  };

export const editingSchema = z.object({
  name: z.string().min(1, "required").max(255),
  description: z.string().min(1).max(2000),
  eventType: z
    .string()
    .min(1)
    .refine((value) => eventTypes.includes(value), "Invalid event type"),
  date: z.custom((value) => {
    if (typeof value === "string") {
      // If the value is a string, validate its format and return it
      if (isValidDateString(value)) {
        return value;
      } else {
        throw new Error("Invalid date string format");
      }
    } else if (value instanceof Date) {
      // If the value is a Date object, convert it to ISO string and return
      return value.toISOString();
    } else {
      // Otherwise, throw an error for invalid type
      throw new Error("Invalid date value type");
    }
  }),
  location: z.string().min(1), // Lieu de l'événement
  image: imageFlyer.optional(), // Flyer de l'evenement
  vipTicketPrice: z.union([z.string(), z.number()]).transform(toNumber).optional(),
  standardTicketPrice: z.union([z.string(), z.number()]).transform(toNumber),
  vipTicketCapacity: z.union([z.string(), z.number()]).transform(toNumber).optional(),
  standardTicketCapacity: z.union([z.string(), z.number()]).transform(toNumber),
});

export type eventFilterEditingValues = z.infer<typeof editingSchema>;
