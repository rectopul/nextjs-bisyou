"use client"

import { Prisma, Settings } from "@prisma/client"
import { SubmitHandler, useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { settings as settingsService } from "@/api/settings.service"
import { Spinner } from "@/components/Spinner"

interface SettingsFormProps {
  settings: Settings
}

export function MissionForm({ settings }: SettingsFormProps) {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const { register, handleSubmit, setValue } =
    useForm<Prisma.SettingsUpdateInput>()

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

  useEffect(() => {
    setValue("storename", settings.storename)
  }, [settings, setValue])

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full h-full flex self-stretch justify-start flex-col gap-2 [&_input]:focus-visible:!ring-0 [&_*]:focus-visible:!shadow-none [&_input]:focus-visible:!ring-offset-0"
      >
        <div className="flex flex-col h-full w-full gap-4">
          <div className="w-full flex self-start flex-col space-y-1.5">
            <Label htmlFor="name">Titulo</Label>
            <Input
              id="name"
              placeholder="Titulo da sessão de perceiros"
              className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              defaultValue={settings.section_partners_title || ""}
              {...register("section_partners_title")}
            />
          </div>
          <div className="w-full flex self-start flex-col space-y-1.5">
            <Label htmlFor="name">Conteúdo</Label>
            <Textarea
              id="name"
              placeholder="Missão da empresa"
              className="outline-none min-h-[93px] !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              defaultValue={settings.section_partners || ""}
              {...register("section_partners")}
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
