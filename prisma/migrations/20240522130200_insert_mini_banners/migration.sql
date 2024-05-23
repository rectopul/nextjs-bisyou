-- CreateTable
CREATE TABLE "mini_banners" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "mini_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mini_banners_images" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "src" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "heigth" INTEGER NOT NULL,
    "miniBanners_id" INTEGER NOT NULL,

    CONSTRAINT "mini_banners_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mini_banners_images_miniBanners_id_key" ON "mini_banners_images"("miniBanners_id");

-- AddForeignKey
ALTER TABLE "mini_banners_images" ADD CONSTRAINT "mini_banners_images_miniBanners_id_fkey" FOREIGN KEY ("miniBanners_id") REFERENCES "mini_banners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
