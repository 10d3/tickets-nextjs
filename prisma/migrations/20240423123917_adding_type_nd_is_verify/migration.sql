/*
  Warnings:

  - Added the required column `eventImage` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" TEXT NOT NULL DEFAULT 'Concert';

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "eventImage" TEXT NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerify" BOOLEAN NOT NULL DEFAULT false;
