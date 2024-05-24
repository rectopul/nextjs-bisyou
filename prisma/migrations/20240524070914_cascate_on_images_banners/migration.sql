-- DropForeignKey
ALTER TABLE "banners_image" DROP CONSTRAINT "banners_image_banners_id_fkey";

-- DropForeignKey
ALTER TABLE "banners_thumbnail" DROP CONSTRAINT "banners_thumbnail_banners_id_fkey";

-- AddForeignKey
ALTER TABLE "banners_thumbnail" ADD CONSTRAINT "banners_thumbnail_banners_id_fkey" FOREIGN KEY ("banners_id") REFERENCES "banners_image"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "banners_image" ADD CONSTRAINT "banners_image_banners_id_fkey" FOREIGN KEY ("banners_id") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
