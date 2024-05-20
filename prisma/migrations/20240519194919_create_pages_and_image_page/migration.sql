-- CreateTable
CREATE TABLE "image_page" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alt" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "heigth" INTEGER NOT NULL,
    "page_id" INTEGER NOT NULL,

    CONSTRAINT "image_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pages" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "excerpt" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_page_page_id_key" ON "image_page"("page_id");

-- AddForeignKey
ALTER TABLE "image_page" ADD CONSTRAINT "image_page_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
