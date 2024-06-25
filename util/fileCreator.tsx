import slugify from "slugify"
import sharp from "sharp"
import fs from "fs"
import { Upload } from "@aws-sdk/lib-storage"
import CryptoJS from "crypto-js"
import { pipeline } from "stream"
import { promisify } from "util"
const pump = promisify(pipeline)
import path from "path"
import { createThumbnail } from "./generateThumbnail"
import { Sharp } from "@/@types/Sharp"
import { PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3"

interface fileCreatorObject {
  name: string
  slug: string
  src: string
  thumbnail?: Sharp.OutputInfo
  key: string
  metadata: {
    width: number
    heigth: number
  }
}

export async function fileCreator(file: File): Promise<fileCreatorObject> {
  try {
    const region = process.env.AWS_DEFAULT_REGION
    const secretAccessKey = process.env.AWS_ACESS_KEY
    const accessKeyId = process.env.AWS_ACESS_KEY_ID
    const bucket = process.env.AWS_BUCKET
    const pathDir = path.join(process.cwd(), "public", "file")
    const hash = CryptoJS.SHA256(file.name + Date.now().toString()).toString(
      CryptoJS.enc.Hex,
    )

    if (!secretAccessKey || !accessKeyId || !region || !bucket)
      throw new Error(`Forneça as credenciais`)

    const s3Client = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    })

    const ext = path.extname(file.name || "")
    const newFilename = `${hash}.webp`
    const convertFile = Buffer.from(await file.arrayBuffer())
    const sharpFile = await await sharp(convertFile)
      .resize({ width: 800 })
      .webp({ quality: 90 })
      .toBuffer()
    const fileInput: PutObjectCommandInput = {
      Body: sharpFile,
      Bucket: bucket,
      Key: newFilename,
      ACL: "public-read",
    }

    const upload = new Upload({
      client: s3Client,
      params: fileInput,
    })

    const fileS3 = await upload.done()

    const metadata = await sharp(sharpFile).webp({ quality: 90 }).metadata()
    const thumbnail = await createThumbnail(
      sharpFile,
      newFilename,
      s3Client,
      bucket,
    )

    const image_slug = slugify(file.name, {
      lower: true,
      strict: true,
    })

    return {
      name: file.name,
      slug: image_slug,
      src: fileS3.Location || "",
      key: newFilename,
      thumbnail: {
        name: thumbnail.name,
        src: thumbnail.src,
        format: "webp",
        size: metadata.size || 0,
        width: 600,
        height: 600,
        channels: 1,
        premultiplied: true,
      },
      metadata: {
        width: metadata.width as number,
        heigth: metadata.height as number,
      },
    }
  } catch (error) {
    throw error
  }
}
