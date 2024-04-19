-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "standardTicketCapacity" INTEGER,
ADD COLUMN     "standardTicketPrice" DOUBLE PRECISION,
ADD COLUMN     "vipTicketCapacity" INTEGER,
ADD COLUMN     "vipTicketPrice" DOUBLE PRECISION;
