-- CreateEnum
CREATE TYPE "MenuPosition" AS ENUM ('header_menu', 'institutional_menu', 'sidebar_menu');

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "position" "MenuPosition" NOT NULL DEFAULT 'header_menu';
