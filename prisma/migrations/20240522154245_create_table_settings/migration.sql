-- AlterTable
ALTER TABLE "mini_banners" ADD COLUMN     "settingsId" INTEGER;

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storename" TEXT NOT NULL,
    "about" TEXT,
    "video" TEXT,
    "description" TEXT,
    "defaultColor" TEXT,
    "textColor" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "settings_storename_key" ON "settings"("storename");
