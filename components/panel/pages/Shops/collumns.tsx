"use client"

import { shops } from "@/api/shops.service"
import { Button } from "@/components/ui/button"
import { DivInput } from "@/components/ui/divInput"
import { Prisma, ShopLocations } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Trash2 } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ShopsLo = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const handleChange = async (
  data: Prisma.ShopLocationsUpdateInput,
  id: number,
) => {
  try {
    await shops.update(data, id)
  } catch (error) {
    console.log(error)
  }
}

export const columns: ColumnDef<ShopLocations>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "address_line1",
    header: "Endereço",
    cell: ({ row }) => {
      const data = row.original

      return (
        <DivInput
          initial={data.address_line1}
          onBlur={(address_line1) => handleChange({ address_line1 }, data.id)}
        />
      )
    },
  },
  {
    accessorKey: "city",
    header: "Cidade",
    cell: async ({ row }) => {
      const data = row.original

      return (
        <DivInput
          initial={data.city}
          onBlur={(city) => handleChange({ city }, data.id)}
        />
      )
    },
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: async ({ row }) => {
      const data = row.original

      return (
        <DivInput
          initial={data.state}
          onBlur={(state) => handleChange({ state }, data.id)}
        />
      )
    },
  },
  {
    accessorKey: `id-actions`,
    header: "Ação",
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <div className="w-full flex gap-2 items-center">
          <Button
            size="icon"
            variant="destructive"
            className="w-7 h-7 p-0"
            data-id={id}
          >
            <Trash2 size={12} strokeWidth={3} />
          </Button>
        </div>
      )
    },
  },
]
