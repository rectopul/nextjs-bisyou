"use client"

import { Prisma, Settings } from "@prisma/client"
import { SubmitHandler, useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ApiErrorHandler } from "@/@types/ApiError"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { settings as settingsService } from "@/api/settings.service"
import { Spinner } from "@/components/Spinner"

interface SettingsFormProps {
  settings: Settings
}

export function SocialsForm({ settings }: SettingsFormProps) {
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
        className="w-full flex flex-col gap-2 [&_input]:focus-visible:!ring-0 [&_*]:focus-visible:!shadow-none [&_input]:focus-visible:!ring-offset-0"
      >
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Facebook</Label>
            <Input
              id="facebook"
              placeholder="Link do facebook"
              className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              type="url"
              inputMode="url"
              defaultValue={settings.facebook || ""}
              {...register("facebook")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Instagram</Label>
            <Input
              id="name"
              placeholder="Link do instagram"
              className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              type="url"
              inputMode="url"
              defaultValue={settings.instagram || ""}
              {...register("instagram")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Pinterest</Label>
            <Input
              id="name"
              placeholder="Link do pinterest"
              className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              type="url"
              inputMode="url"
              defaultValue={settings.pinterest || ""}
              {...register("pinterest")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">TikTok</Label>
            <Input
              id="name"
              placeholder="Link do TikTok"
              className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
              type="url"
              inputMode="url"
              defaultValue={settings.tiktok || ""}
              {...register("tiktok")}
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
