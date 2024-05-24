-- CreateTable
CREATE TABLE "banners_thumbnail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "src" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "heigth" INTEGER NOT NULL,
    "banners_id" INTEGER NOT NULL,

    CONSTRAINT "banners_thumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banners_thumbnail_banners_id_key" ON "banners_thumbnail"("banners_id");

-- AddForeignKey
ALTER TABLE "banners_thumbnail" ADD CONSTRAINT "banners_thumbnail_banners_id_fkey" FOREIGN KEY ("banners_id") REFERENCES "banners_image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
