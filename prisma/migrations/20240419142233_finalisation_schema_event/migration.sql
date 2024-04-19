/*
  Warnings:

  - You are about to drop the column `capacity` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.
  - Made the column `standardTicketPrice` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "capacity",
DROP COLUMN "price",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "standardTicketPrice" SET NOT NULL;
