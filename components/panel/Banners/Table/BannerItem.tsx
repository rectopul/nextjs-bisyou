"use client"

import { ApiErrorHandler } from "@/@types/ApiError"
import { BannersWithImages } from "@/app/page"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { DivInput } from "@/components/ui/divInput"
import { TableCell, TableRow } from "@/components/ui/table"
import { Banners, Prisma } from "@prisma/client"
import { SquarePenIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BannerFormImage } from "./BannerFormImage"

interface BannerItemProps {
  banner: BannersWithImages
  onDelete: (data: Banners) => void
  onUpdated: (data: BannersWithImages) => void
}

export function BannerItem({ banner, onDelete, onUpdated }: BannerItemProps) {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [updateLoad, setUpdateLoad] = useState<boolean>(false)
  const [isImageEdit, setIsImageEdit] = useState<boolean>(false)

  const handleDelete = async (id: number) => {
    try {
      setIsLoad(true)
      const options: RequestInit = {
        method: "DELETE",
      }

      const req = await fetch(`/api/banners/delete?id=${id}`, options)

      if (!req.ok) {
        toast.error(`Erro ao deletar banner`)
      }

      const res: Banners = await req.json()

      toast.success(`Banner ${res.title} deletado com sucesso`)
      onDelete(res)
      return setIsLoad(false)
    } catch (error: any) {
      toast.error(error.message)
      console.error("Erro ao deletar banner:", error)
      return setIsLoad(false)
    }
  }

  const handleUpdate = async (data: Prisma.BannersUpdateInput) => {
    try {
      setUpdateLoad(true)
      const options: RequestInit = {
        method: "PUT",
        body: JSON.stringify(data),
      }

      const req = await fetch(`/api/banners/update?id=${banner.id}`, options)

      if (!req.ok) {
        const error: ApiErrorHandler = await req.json()

        toast.error(`Erro ao atualizar banner`, {
          description: error.message,
          action: {
            label: `Fechar`,
            onClick: console.log,
          },
        })
      }

      const updated = await req.json()

      onUpdated(updated)

      toast.success(`Sucesso`, {
        description: `Banner atualizado com sucesso!`,
        action: {
          label: `Fechar`,
          onClick: console.log,
        },
      })

      return setUpdateLoad(false)
    } catch (error: any) {
      toast.error(`Erro ao atualizar banner`, {
        description: error.message,
        action: {
          label: `Fechar`,
          onClick: console.log,
        },
      })

      return setUpdateLoad(false)
    }
  }

  return (
    <>
      {isImageEdit && (
        <BannerFormImage
          onClose={() => setIsImageEdit(!isImageEdit)}
          banner={banner}
          key={`bi-${banner.id}`}
          onUpdate={onUpdated}
        />
      )}
      <TableRow key={`p-b-${banner.id}`}>
        <TableCell className="font-medium">
          {updateLoad ? <Spinner fill="#82bd69" size="md" /> : banner.id}
        </TableCell>
        <TableCell>
          <figure className="p-2 w-12 group h-12 relative bg-white rounded-sm flex justify-center items-center overflow-hidden border border-slate-900">
            <button
              onClick={() => setIsImageEdit(!isImageEdit)}
              className="absolute group-hover:opacity-100 group-hover:scale-100 rounded-sm scale-50 z-10 top-0 left-0 w-full h-full flex justify-center items-center text-white bg-black/50 transition-all duration-150 opacity-0"
            >
              <SquarePenIcon size={15} />
            </button>
            {banner.image && banner.image.thumbnail && (
              <Image
                src={banner.image.thumbnail.sm}
                width={banner.image.thumbnail.width}
                height={banner.image.thumbnail.heigth}
                className="h-full w-auto max-w-[initial] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                alt={banner.image.alt}
                unoptimized
              />
            )}
          </figure>
        </TableCell>
        <TableCell>
          <DivInput
            initial={banner.title || ""}
            onBlur={(title) =>
              banner.title !== title && handleUpdate({ title })
            }
          />
        </TableCell>
        <TableCell>
          <Select
            defaultValue={banner.position || ""}
            name="position"
            onValueChange={(position) => handleUpdate({ position })}
          >
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Posição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Banner</SelectItem>
              <SelectItem value="medium">Icones</SelectItem>
              <SelectItem value="mini">Mini Banner</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Select
            defaultValue={banner.status || ""}
            name="status"
            onValueChange={(status) => handleUpdate({ status })}
          >
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="deactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          {banner.image && banner.image.mobile ? `true` : `false`}
        </TableCell>
        <TableCell className="text-right">
          <div className="w-full flex justify-end gap-4">
            <Button
              key={`b-delete-bn-${banner.id}`}
              onClick={() => handleDelete(banner.id)}
              data-action={banner.id}
              variant="destructive"
              className="w-8 h-8"
              size="icon"
            >
              {isLoad ? <Spinner size="xs" /> : <Trash2 size={16} />}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}
