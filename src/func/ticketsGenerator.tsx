 // Importez votre fonction de génération de QR code
import { prisma } from '@/db/prisma';
import { generateQRCode } from './qrCodeGen';


export default async function generateTicketsForEvent(eventId: string) {
  // Récupérez les données de l'événement
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  console.log(event)

  if (event) {
    const { standardTicketPrice, standardTicketCapacity } = event; // Obtenez le prix du ticket et la capacité de l'événement
    const numberOfTickets = standardTicketCapacity; // Utilisez la capacité de l'événement comme nombre de tickets à générer

    for (let i = 0; i < numberOfTickets; i++) {
      // Générez le contenu unique du QR code pour chaque ticket
      const ticketContent = `${eventId}_${i}`;

      // Générez le QR code
      const qrCodePath = await generateQRCode(ticketContent);

      if (qrCodePath) {
        // Créez le ticket dans la base de données avec le chemin du QR code
        await prisma.ticket.create({
          data: {
            eventId,
            price:standardTicketPrice,
            qrCodePath,
            status: "available",
            // Autres champs du ticket
          }
        });
      } else {
        console.error('Erreur lors de la génération du QR code pour le ticket', i);
      }
    }
  } else {
    console.error('L\'événement avec l\'ID spécifié n\'a pas été trouvé');
  }
}

// Utilisation de la fonction pour générer les tickets pour un événement donné
// generateTicketsForEvent('test_id_prisma_event')


export async function generateVIPTicketsForEvent(eventId: string) {
  // Récupérez les données de l'événement
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  console.log(event)

  if (event) {
    const { vipTicketPrice, vipTicketCapacity }:{vipTicketPrice:number|null, vipTicketCapacity:number|null} = event; // Obtenez le prix du ticket et la capacité de l'événement
    const numberOfTickets:number|null = vipTicketCapacity; // Utilisez la capacité de l'événement comme nombre de tickets à générer

    for (let i = 0; i < numberOfTickets; i++) {
      // Générez le contenu unique du QR code pour chaque ticket
      const ticketContent = `${eventId}_${i}`;

      // Générez le QR code
      const qrCodePath = await generateQRCode(ticketContent);

      if (qrCodePath) {
        // Créez le ticket dans la base de données avec le chemin du QR code
        await prisma.ticket.create({
          data: {
            eventId,
            price : vipTicketPrice,
            qrCodePath,
            status: "available",
            // Autres champs du ticket
          }
        });
      } else {
        console.error('Erreur lors de la génération du QR code pour le ticket', i);
      }
    }
  } else {
    console.error('L\'événement avec l\'ID spécifié n\'a pas été trouvé');
  }
}