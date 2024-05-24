/*
  Warnings:

  - Added the required column `lg` to the `banners_thumbnail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `md` to the `banners_thumbnail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sm` to the `banners_thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banners_thumbnail" ADD COLUMN     "lg" TEXT NOT NULL,
ADD COLUMN     "md" TEXT NOT NULL,
ADD COLUMN     "sm" TEXT NOT NULL;
