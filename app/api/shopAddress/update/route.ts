//{ params }: { params: { page_id: string } }

import { PrismaErrorHandler } from "@/@types/PrismaErrorHandler"
import prisma from "@/lib/client"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url)
    const value = String(url.searchParams.get("id"))
    const id = +value
    const data = (await req.json()) as Prisma.ShopLocationsUpdateInput

    const hasShop = await prisma.shopLocations.findFirst({
      where: { id },
    })

    if (!hasShop) {
      return NextResponse.json(
        {
          name: "not exists",
          message: "Shop not exists",
        },
        { status: 401 },
      )
    }

    const updated = await prisma.shopLocations.update({
      where: { id: id },
      data,
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.log(error)
    if (error.name === "PrismaClientKnownRequestError") {
      const hasError = error as PrismaErrorHandler

      if (hasError.code === "P2002") {
        return NextResponse.json(
          {
            name: "duplicidade",
            message: `Os campos ${hasError.meta.target.join(" ")} já existem`,
          },
          { status: 409 },
        )
      }
    }
    return Response.json(error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
