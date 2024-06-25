import { NextRequest } from "next/server"
import prisma from "@/lib/client"
import fs from "fs"
import path from "path"
import { fileCreator } from "@/util/fileCreator"
import { validImageMimeTypes } from "@/util/imageMimeTypes"
import { fileDelete } from "@/util/fileDelete"

export const dynamic = "force-dynamic"
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const value = String(url.searchParams.get("id"))
  const id = +value

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

    if (banner.image) {
      if (banner.image.mobile_key) {
        await fileDelete(banner.image.mobile_key)
      }

      if (banner.image.key !== "AWS_BUCKET") {
        await fileDelete(banner.image.key)

        if (banner.image.thumbnail) {
          await fileDelete(banner.image.thumbnail.sm_key)
          await fileDelete(banner.image.thumbnail.md_key)
          await fileDelete(banner.image.thumbnail.lg_key)
        }
      }
    }

    const deleted = await prisma.banners.delete({ where: { id } })

    return Response.json(deleted)
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
