/*
  Warnings:

  - Changed the type of `street_number` on the `shop_locations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "shop_locations" DROP COLUMN "street_number",
ADD COLUMN     "street_number" INTEGER NOT NULL;
