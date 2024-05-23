-- DropForeignKey
ALTER TABLE "image_page" DROP CONSTRAINT "image_page_page_id_fkey";

-- AddForeignKey
ALTER TABLE "image_page" ADD CONSTRAINT "image_page_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
