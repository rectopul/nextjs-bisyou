/*
  Warnings:

  - Made the column `status` on table `Pages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pages" ALTER COLUMN "status" SET NOT NULL;
