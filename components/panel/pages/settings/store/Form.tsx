"use client"

import { Prisma, Settings } from "@prisma/client"
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { settings as settingsService } from "@/api/settings.service"
import { useState } from "react"
import { Spinner } from "@/components/Spinner"

interface SettingsFormProps {
  settings: Settings
}

export function StoreForm({ settings }: SettingsFormProps) {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const { register, handleSubmit } = useForm<Prisma.SettingsUpdateInput>()

  const onSubmitForm: SubmitHandler<Prisma.SettingsUpdateInput> = async (
    data,
  ) => {
    try {
      setIsLoad(true)
      await settingsService.update(data, settings.id)
      return setIsLoad(false)
    } finally {
      return setIsLoad(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full flex flex-col gap-2 [&_input]:focus-visible:!ring-0 [&_*]:focus-visible:!shadow-none [&_input]:focus-visible:!ring-offset-0"
      >
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Nome da sua loja"
              className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              defaultValue={settings.storename}
              {...register("storename")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">
              Telefone{" "}
              <span className="text-xs text-red-400">
                ficara visivel para os clientes
              </span>
            </Label>
            <Input
              id="phone"
              placeholder="Telefone (ficará visível para os clientes)"
              className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              inputMode="numeric"
              defaultValue={settings.phone || ""}
              {...register("phone")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">
              Email{" "}
              <span className="text-xs text-red-400">
                ficara visivel para os clientes
              </span>
            </Label>
            <Input
              id="email"
              placeholder="E-mail (ficará visível para os clientes)"
              className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              type="email"
              defaultValue={settings.email || ""}
              {...register("email")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Produto Destaque </Label>
            <Input
              id="product_video"
              placeholder="Slug do produto com video para destaque na home page"
              className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              type="text"
              defaultValue={settings.product_video || ""}
              {...register("product_video")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">CNPJ </Label>
            <Input
              id="product_video"
              placeholder="CNPJ da empresa"
              className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              type="text"
              defaultValue={settings.cnpj || ""}
              {...register("cnpj")}
            />
          </div>

          <div className="items-center py-6 pt-0 flex justify-between">
            <Button variant="default" type="submit">
              {isLoad ? <Spinner size="sm" /> : "Atualizar"}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
