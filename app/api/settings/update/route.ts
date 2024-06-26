import { ApiErrorHandler } from "@/@types/ApiError"
import prisma from "@/lib/client"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import slugify from "slugify"

export const dynamic = "force-dynamic"
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const value = String(url.searchParams.get("id"))
  const id = +value
  const data = (await req.json()) as Prisma.SettingsUpdateInput

  try {
    if (!value) {
      const error: ApiErrorHandler = {
        message: `settings id is missing`,
        name: `not found`,
      }
      return NextResponse.json(error, { status: 405 })
    }

    if (data) {
      //Criação da página
      const hasSettings = await prisma.settings.findFirst({
        where: { id },
      })

      if (!hasSettings) {
        return NextResponse.json(
          {
            name: "not found",
            message: "This settings not exists",
          },
          { status: 400 },
        )
      }

      const { storename } = data

      if (storename) {
        const storeSlug = slugify(String(storename), {
          strict: true,
          lower: true,
        })

        const response = await prisma.settings.update({
          where: { id },
          data: { ...data, storeSlug },
        })

        return NextResponse.json(response)
      }

      const response = await prisma.settings.update({
        where: { id },
        data,
      })

      return NextResponse.json(response)
    }

    return NextResponse.json(
      { name: "image not found", message: "por favor envie a imagem" },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
