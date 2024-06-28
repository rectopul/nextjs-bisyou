import { ApiErrorHandler } from "@/@types/ApiError"
import prisma from "@/lib/client"
import { fileCreator } from "@/util/fileCreator"
import { fileDelete } from "@/util/fileDelete"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const value = String(url.searchParams.get("id"))
  const id = +value
  const formData = await req.formData()
  const file = formData.get("file") as File

  try {
    if (!value) {
      const error: ApiErrorHandler = {
        message: `settings id is missing`,
        name: `not found`,
      }
      return NextResponse.json(error, { status: 405 })
    }
    if (!file) {
      const error: ApiErrorHandler = {
        message: `file is missing`,
        name: `not found`,
      }
      return NextResponse.json(error, { status: 405 })
    }

    const settings = await prisma.settings.findFirst({ where: { id } })

    if (!settings) {
      return NextResponse.json(
        {
          name: "not found",
          message: "This settings not exists",
        },
        { status: 400 },
      )
    }

    if (settings.logo) {
      await fileDelete(settings.logo)
    }

    const { src } = await fileCreator(file)

    const updated = await prisma.settings.update({
      where: { id },
      data: { logo: src },
    })

    return NextResponse.json(updated, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
