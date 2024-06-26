import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { listCollections } from "@/shopify"
import prisma from "@/lib/client"
import { CollectionItem } from "./CollectionItem"

export async function CollectionsTable() {
  const shopifyCollections = await listCollections()
  const collections = await prisma.colletions.findMany({
    orderBy: { id: "desc" },
  })

  return (
    <Table>
      <TableCaption>Lista de collections da shopify.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Thumbnail</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Posição</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ordem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shopifyCollections?.map((c) => {
          const matchingCollections = collections.filter(
            (cl) => cl.slug === c.node.handle,
          )
          const lastMatchingCollection = matchingCollections.at(-1)

          return (
            <CollectionItem
              key={`cll-t-${c.node.id}`}
              collection={c}
              prismaCollection={lastMatchingCollection}
            />
          )
        })}
      </TableBody>
    </Table>
  )
}
