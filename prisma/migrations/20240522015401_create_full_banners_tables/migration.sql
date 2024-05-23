-- CreateTable
CREATE TABLE "banners" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners_image" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "src" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "heigth" INTEGER NOT NULL,
    "banners_id" INTEGER NOT NULL,

    CONSTRAINT "banners_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "banners_image" ADD CONSTRAINT "banners_image_banners_id_fkey" FOREIGN KEY ("banners_id") REFERENCES "banners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
