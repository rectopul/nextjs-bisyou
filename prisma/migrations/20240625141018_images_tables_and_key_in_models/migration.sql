-- AlterTable
ALTER TABLE "banners_image" ADD COLUMN     "key" TEXT NOT NULL DEFAULT 'AWS_BUCKET';

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_sizes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagesId" INTEGER NOT NULL,
    "full" TEXT NOT NULL,
    "md" TEXT NOT NULL,
    "sm" TEXT NOT NULL,
    "xs" TEXT NOT NULL,

    CONSTRAINT "images_sizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images_sizes" ADD CONSTRAINT "images_sizes_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
