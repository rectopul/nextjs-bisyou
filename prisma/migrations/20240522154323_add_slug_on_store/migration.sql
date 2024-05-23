/*
  Warnings:

  - A unique constraint covering the columns `[storeSlug]` on the table `settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storeSlug` to the `settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "storeSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "settings_storeSlug_key" ON "settings"("storeSlug");
