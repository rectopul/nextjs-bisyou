"use client"

import { BannersWithImages } from "@/app/page"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Banners } from "@prisma/client"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

interface BannerItemProps {
  banner: BannersWithImages
  onDelete: (data: Banners) => void
}

export function BannerItem({ banner, onDelete }: BannerItemProps) {
  const [isLoad, setIsLoad] = useState<boolean>(false)

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

  return (
    <>
      <TableRow key={`p-b-${banner.id}`}>
        <TableCell className="font-medium">{banner.id}</TableCell>
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
        <TableCell>{banner.title}</TableCell>
        <TableCell className="text-right">{banner.position}</TableCell>
        <TableCell className="text-right">{banner.status}</TableCell>
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
