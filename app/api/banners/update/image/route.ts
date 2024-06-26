import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/client"
import { fileCreator } from "@/util/fileCreator"
import { ApiErrorHandler } from "@/@types/ApiError"
import { fileDelete } from "@/util/fileDelete"

/**
 *
 * @param request
 * @returns
 *
 */

export async function PUT(req: NextRequest) {
  const formData = await req.formData()
  const file: any = formData.get("file")
  const mobile: any = formData.get("mobile")

  const url = new URL(req.url)
  const value = String(url.searchParams.get("id"))
  const id = +value

  try {
    if (!file) {
      const error: ApiErrorHandler = {
        message: `Please send Image`,
        name: `missing fields`,
      }

      return Response.json(error, { status: 401 })
    }

    const banner = await prisma.banners.findFirst({
      where: { id },
      include: { image: { include: { thumbnail: true } } },
    })

    if (!banner) {
      const error: ApiErrorHandler = {
        message: `Banner not found`,
        name: `not found`,
      }

      return Response.json(error, { status: 400 })
    }

    //Delete image
    if (banner.image) {
      await fileDelete(banner.image.key)

      //delete mobile image
      if (mobile && banner.image.mobile_key) {
        await fileDelete(banner.image.mobile_key)
      }

      //delete thumbnails
      if (banner.image.thumbnail) {
        if (banner.image.thumbnail.lg_key)
          await fileDelete(banner.image.thumbnail.lg_key)
        if (banner.image.thumbnail.md_key)
          await fileDelete(banner.image.thumbnail.md_key)
        if (banner.image.thumbnail.sm_key)
          await fileDelete(banner.image.thumbnail.sm_key)
      }

      //create file
      const {
        metadata,
        slug: image_slug,
        thumbnail,
        key,
        src,
        name,
      } = await fileCreator(file)

      const dimensions = {
        width: metadata.width as number,
        height: metadata.heigth as number,
      }

      let fileMobile = null

      if (banner) {
        if (mobile) {
          const createFileMobile = await fileCreator(mobile)

          fileMobile = createFileMobile.src
        }

        const banner_image = await prisma.bannersImage.update({
          where: { id: banner.image.id },
          data: {
            alt: image_slug,
            src: src,
            heigth: dimensions.height,
            mobile: fileMobile,
            key,
            width: dimensions.width,
            name,
            banners_id: banner.id,
          },
        })

        if (banner.image.thumbnail && thumbnail) {
          await prisma.bannersThumbnail.update({
            where: { id: banner.image.thumbnail.id },
            data: {
              heigth: thumbnail.height,
              width: thumbnail.width,
              banners_id: banner_image.id,
              name,
              alt: image_slug,
              src: thumbnail.src.md.name,
              lg: thumbnail.src.lg.name,
              md: thumbnail.src.md.name,
              sm: thumbnail.src.sm.name,
              lg_key: thumbnail.src.lg.key,
              md_key: thumbnail.src.md.key,
              sm_key: thumbnail.src.sm.key,
            },
          })
        }
      }
    }

    const resp = await prisma.banners.findFirst({
      where: { id: banner.id },
      include: {
        image: { include: { thumbnail: true } },
      },
    })

    return Response.json(resp)
  } catch (error) {
    console.log(`erro no banner`, error)
    return Response.json(error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
