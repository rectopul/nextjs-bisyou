import { TableCell, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MenuPosition, Menus } from "@prisma/client"
import { capitalize } from "@/util/captalize"
import { Skeleton } from "@/components/ui/skeleton"

interface MenuItemPanelProps {
  item: Menus
}

export function MenuItemPanel({ item }: MenuItemPanelProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.slug}</TableCell>
      <TableCell className="text-right">
        <Select defaultValue={item.position}>
          <SelectTrigger className="w-[180px] h-8 ml-auto">
            <SelectValue placeholder="Selecione a Posição" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(MenuPosition).map((position) => (
              <SelectItem key={`mp-${position}`} value={position}>
                {capitalize(position.replace(/_/g, " "))}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  )
}
