/*
  Warnings:

  - A unique constraint covering the columns `[banners_id]` on the table `banners_image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "banners_image_banners_id_key" ON "banners_image"("banners_id");
