"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Banners } from "@prisma/client"
import { useState } from "react"
import { CreateBanner } from "./BannerForm"
import { BannersWithImages } from "@/app/page"
import { BannerItem } from "./BannerItem"

interface BannersTableProps {
  banners: BannersWithImages[]
}

export function BannersTable({ banners }: BannersTableProps) {
  const [bann, setBann] = useState<BannersWithImages[]>(banners)

  const handleDelete = async (banner: Banners) => {
    const filter = bann.filter((b) => b.id !== banner.id)

    setBann(filter)
  }

  const onInsert = (data: BannersWithImages) => {
    setBann((prev) => [...prev, data])
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <CreateBanner onCreate={onInsert} />

        <div>
          <Table>
            <TableCaption>Lista de banners.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Posição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bann.map((b) => (
                <BannerItem
                  key={`p-b-${b.id}`}
                  onDelete={handleDelete}
                  banner={b}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
