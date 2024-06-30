import { listMenus } from "@/shopify"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MenuItemPanel } from "@/components/panel/menu/MenuItemPanel"
import { FormMenu } from "@/components/panel/menu/FormMenu"
import prisma from "@/lib/client"

const getData = async () => {
  const menus = await prisma.menus.findMany()

  return { menus }
}

export default async function Menus() {
  const { menus } = await getData()

  return (
    <>
      <div className="w-full">
        <FormMenu />
      </div>
      <Table>
        <TableCaption>Listagem de menus.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Posição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus &&
            menus.map((r) => <MenuItemPanel key={`tw-mn-${r.id}`} item={r} />)}
        </TableBody>
      </Table>
    </>
  )
}
