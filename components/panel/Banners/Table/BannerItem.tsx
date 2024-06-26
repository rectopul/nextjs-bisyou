"use client"

import { ApiErrorHandler } from "@/@types/ApiError"
import { BannersWithImages } from "@/app/page"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { DivInput } from "@/components/ui/divInput"
import { TableCell, TableRow } from "@/components/ui/table"
import { Banners, Prisma } from "@prisma/client"
import { Trash2 } from "lucide-react"
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

interface BannerItemProps {
  banner: BannersWithImages
  onDelete: (data: Banners) => void
  onUpdated: (data: BannersWithImages) => void
}

export function BannerItem({ banner, onDelete, onUpdated }: BannerItemProps) {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [updateLoad, setUpdateLoad] = useState<boolean>(false)

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
      <TableRow key={`p-b-${banner.id}`}>
        <TableCell className="font-medium">
          {updateLoad ? <Spinner fill="#82bd69" size="md" /> : banner.id}
        </TableCell>
        <TableCell>
          <figure className="p-2 w-12 h-12 relative bg-white rounded-sm flex justify-center items-center overflow-hidden border border-slate-900">
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
