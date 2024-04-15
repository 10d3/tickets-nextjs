import QRCode from 'qrcode'
import fs from 'fs/promises';
import path from 'path';

// Fonction pour générer un QR code et enregistrer l'image
export async function generateQRCode(content: string): Promise<string | null> {
  const qrCodePath = path.join(process.cwd(), 'public', 'qrcodes', `${content}.png`);

  try {
    await QRCode.toFile(qrCodePath, content);
    return qrCodePath.replace(process.cwd(), '');
  } catch (error) {
    console.error('Erreur lors de la génération du QR code :', error);
    return null;
  }
}
