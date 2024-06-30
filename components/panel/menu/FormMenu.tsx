"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MenuPosition, Menus } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Prisma } from "@prisma/client"
import { SubmitHandler, useForm } from "react-hook-form"
import { capitalize } from "@/util/captalize"
import { toast } from "sonner"
import { getMenu } from "@/shopify"
import { ApiErrorHandler } from "@/@types/ApiError"
import { Skeleton } from "@/components/ui/skeleton"
import { AlignJustify, RectangleEllipsis } from "lucide-react"

export const PositionType = ({ position }: { position: MenuPosition }) => {
  switch (position) {
    case "header_menu":
      return (
        <>
          <div className="rounded-sm bg-slate-200 flex flex-col gap-1 items-center justify-center p-2">
            <RectangleEllipsis size={15} />
          </div>
        </>
      )
    case "institutional_menu":
      return (
        <>
          <div className="rounded-sm bg-slate-200 flex flex-col gap-1 items-center justify-center p-2">
            <AlignJustify size={15} />
          </div>
        </>
      )
    case "sidebar_menu":
      return (
        <>
          <div className="rounded-sm bg-slate-200 flex flex-col gap-1 items-center justify-center p-2">
            <AlignJustify size={15} />
          </div>
        </>
      )

    default:
      return null
  }
}

export function FormMenu() {
  const {
    register: menuRegister,
    setValue: menuSetValue,
    handleSubmit: menuHandleSubmit,
  } = useForm<Prisma.MenusCreateInput>()

  const onSubmit: SubmitHandler<Prisma.MenusCreateInput> = async (data) => {
    try {
      const menu = await getMenu(data.slug)

      if (!menu) {
        return toast.error("Erro", {
          description: `Erro ao buscar menu na shopify`,
          action: {
            label: `Fechar`,
            onClick: console.log,
          },
        })
      }

      const { handle, id, items, itemsCount, title } = menu.data.menu

      const values: Prisma.MenusCreateInput = {
        title,
        shopify_id: id,
        slug: handle,
        type: "SHOPIFY_MENU",
        locate: "PT_BR",
        position: data.position,
      }

      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(values),
      }

      const req = await fetch(`/api/menu`, options)

      if (!req.ok) {
        const error: ApiErrorHandler = await req.json()
        return toast.error("Erro", {
          description: error.message,
          action: {
            label: `Fechar`,
            onClick: console.log,
          },
        })
      }

      const created: Menus = await req.json()

      return toast.success("Sucesso", {
        description: `Menu ${created.title} criado com sucesso`,
        action: {
          label: `Fechar`,
          onClick: console.log,
        },
      })
    } catch (error: any) {
      return toast.error("Erro", {
        description: error.message,
        action: {
          label: `Fechar`,
          onClick: console.log,
        },
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 text-sm font-light">Novo</Button>
      </DialogTrigger>
      <DialogContent className="w-[400px] font-light">
        <DialogHeader>
          <DialogTitle>Cadastrar menu</DialogTitle>
          <DialogDescription>
            Utilize o formulário abaixo para cadastrar um novo menu.
          </DialogDescription>

          <div className="w-full font-light">
            <form
              className="w-full flex flex-col gap-3 mt-5"
              onSubmit={menuHandleSubmit(onSubmit)}
            >
              <Input
                {...menuRegister("slug", { required: true })}
                placeholder="Slug do menu na shopify"
                className="h-8 focus-within:ring-0 focus-within:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Select
                onValueChange={(value: MenuPosition) =>
                  menuSetValue("position", value)
                }
              >
                <SelectTrigger className="w-full h-10 ml-auto items-center [&_[data-description]]:hidden">
                  <SelectValue placeholder="Selecione a Posição" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MenuPosition).map((position) => (
                    <SelectItem key={`mp-${position}`} value={position}>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <PositionType position={position} />
                        <div className="grid gap-0.5">
                          <p>
                            {capitalize(position.replace(/_/g, " "))}
                            <span className="font-medium text-foreground ml-1">
                              Bisyou
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Our fastest model for general use cases.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="h-8 text-sm font-light" type="submit">
                Cadastrar
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
