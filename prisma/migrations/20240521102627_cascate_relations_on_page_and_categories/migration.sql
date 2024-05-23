-- DropForeignKey
ALTER TABLE "category_pages" DROP CONSTRAINT "category_pages_category_id_fkey";

-- DropForeignKey
ALTER TABLE "category_pages" DROP CONSTRAINT "category_pages_pages_id_fkey";

-- AddForeignKey
ALTER TABLE "category_pages" ADD CONSTRAINT "category_pages_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_pages" ADD CONSTRAINT "category_pages_pages_id_fkey" FOREIGN KEY ("pages_id") REFERENCES "Pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
