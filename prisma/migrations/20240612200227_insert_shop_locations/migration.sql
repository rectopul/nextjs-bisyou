-- CreateTable
CREATE TABLE "shop_locations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "street_address" TEXT NOT NULL,
    "street_number" TEXT NOT NULL,
    "suite_number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT NOT NULL,
    "maps_url" TEXT NOT NULL,

    CONSTRAINT "shop_locations_pkey" PRIMARY KEY ("id")
);
