-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
