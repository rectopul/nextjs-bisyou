import { NextRequest } from "next/server"
import prisma from "@/lib/client"
import { Prisma } from "@prisma/client"

export const dynamic = "force-dynamic"
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const value = String(url.searchParams.get("id"))
  const id = +value
  const data = (await req.json()) as Prisma.BannersUpdateInput

  try {
    const banner = await prisma.banners.findFirst({
      where: { id },
      include: { image: { include: { thumbnail: true } } },
    })

    if (!banner) {
      return Response.json(
        { name: "not fount", message: "banner not found" },
        { status: 401 },
      )
    }

    await prisma.banners.update({
      where: { id },
      data,
    })

    const resp = await prisma.banners.findFirst({
      where: { id },
      include: { image: { include: { thumbnail: true } } },
    })

    return Response.json(resp)
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
