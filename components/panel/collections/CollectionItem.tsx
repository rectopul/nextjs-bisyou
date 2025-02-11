"use client"

import { Shopify } from "@/@types/shopify"
import { TableCell, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Colletions, Prisma } from "@prisma/client"
import React, { useState } from "react"
import { ApiErrorHandler } from "@/@types/ApiError"
import { toast } from "sonner"

interface CollectionItemProps {
  prismaCollection: Colletions | undefined
  collection: Shopify.Collection
}

export function CollectionItem({
  collection,
  prismaCollection,
}: CollectionItemProps) {
  const [internal, setInternal] = useState<Colletions | undefined>(
    prismaCollection,
  )
  const [order, setOrder] = useState<number>(10)
  const [products_quantity, setProductQuantity] = useState<number>(10)

  const handleChange = async (position: string) => {
    const data: Prisma.ColletionsUpdateInput = {
      position,
      slug: collection.node.handle,
      title: collection.node.title,
      collection_id: collection.node.id,
      thumbnail: collection.node.image?.thumbnail,
      products_quantity,
      order,
    }
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
    }

    const req = await fetch(
      `/api/collections/update?slug=${collection.node.handle}`,
      options,
    )

    if (!req.ok) {
      const error: ApiErrorHandler = await req.json()

      toast.error(error.message)
    }

    const res: Colletions = await req.json()

    setInternal(res)

    toast.success(`Coleção atualizada com sucesso!`)
  }
  const handleChangeStatus = async (active: string) => {
    let status = true
    if (active === "true") {
      status = true
    } else {
      status = true
    }

    const data: Prisma.ColletionsUpdateInput = {
      active: status,
      slug: collection.node.handle,
      title: collection.node.title,
      collection_id: collection.node.id,
      thumbnail: collection.node.image?.thumbnail,
      products_quantity,
      order,
    }
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
    }

    const req = await fetch(
      `/api/collections/update?slug=${collection.node.handle}`,
      options,
    )

    if (!req.ok) {
      const error: ApiErrorHandler = await req.json()

      toast.error(error.message)
    }

    const res: Colletions = await req.json()

    setInternal(res)

    toast.success(`Coleção atualizada com sucesso!`)
  }

  const changeQuantity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!internal) {
      return toast.error(`Selecione uma posição`)
    }
    const products_quantity = parseInt(e.currentTarget.value)
    setProductQuantity(products_quantity)

    const data: Prisma.ColletionsUpdateInput = {
      position: internal.position,
      slug: collection.node.handle,
      title: collection.node.title,
      collection_id: collection.node.id,
      thumbnail: collection.node.image?.thumbnail,
      products_quantity,
      order,
    }
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
    }

    const req = await fetch(
      `/api/collections/update?slug=${collection.node.handle}`,
      options,
    )

    if (!req.ok) {
      const error: ApiErrorHandler = await req.json()

      toast.error(error.message)
    }

    const res: Colletions = await req.json()

    setInternal(res)

    toast.success(`Coleção atualizada com sucesso!`)
  }

  const changeOrder = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!internal) {
      return toast.error(`Defina a ordem da coleção`)
    }
    const order = parseInt(e.currentTarget.value)

    setOrder(order)

    const data: Prisma.ColletionsUpdateInput = {
      position: internal.position,
      slug: collection.node.handle,
      title: collection.node.title,
      collection_id: collection.node.id,
      thumbnail: collection.node.image?.thumbnail,
      products_quantity,
      order,
    }
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
    }

    const req = await fetch(
      `/api/collections/update?slug=${collection.node.handle}`,
      options,
    )

    if (!req.ok) {
      const error: ApiErrorHandler = await req.json()

      toast.error(error.message)
    }

    const res: Colletions = await req.json()

    setInternal(res)

    toast.success(`Coleção atualizada com sucesso!`)
  }

  return (
    <TableRow key={`p-collections-${collection.node.id}`}>
      {collection.node.image ? (
        <TableCell className="font-medium">
          <Image
            src={collection.node.image.thumbnail}
            alt={collection.node.image.altText}
            width={100}
            height={100}
            unoptimized
            className="rounded-sm"
          />
        </TableCell>
      ) : (
        <TableCell className="font-medium">
          <Image
            src="https://placehold.co/100x100?text=No+Image"
            alt="no collection"
            width={100}
            height={100}
            unoptimized
            className="rounded-sm"
          />
        </TableCell>
      )}
      <TableCell>{collection.node.title}</TableCell>
      <TableCell>
        <Select
          onValueChange={handleChange}
          defaultValue={internal ? internal.position : ""}
        >
          <SelectTrigger className="w-[180px] h-8 font-light">
            <SelectValue placeholder="Posição" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="homepage">Home</SelectItem>
            <SelectItem value="productpage">Produtos</SelectItem>
            <SelectItem value="filterpage">Filter</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell>
        <Input
          defaultValue={
            prismaCollection
              ? prismaCollection.products_quantity
              : products_quantity
          }
          inputMode="numeric"
          className="w-12 h-8 text-center"
          onChange={changeQuantity}
        />
      </TableCell>

      <TableCell>
        <Select
          onValueChange={handleChangeStatus}
          defaultValue={internal && internal.active ? "true" : "false"}
        >
          <SelectTrigger className="w-[180px] h-8 font-light">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Ativo</SelectItem>
            <SelectItem value="false">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell>
        <Input
          defaultValue={internal ? internal.order : 0}
          inputMode="numeric"
          className="w-12 h-8 text-center ml-auto"
          onChange={changeOrder}
        />
      </TableCell>
    </TableRow>
  )
}
