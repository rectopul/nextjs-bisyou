import { shops } from "@/api/shops.service"
import { Prisma } from "@prisma/client"

export const handleShopChange = async (
  data: Prisma.ShopLocationsUpdateInput,
  id: number,
) => {
  try {
    await shops.update(data, id)
  } catch (error) {
    console.log(error)
  }
}
