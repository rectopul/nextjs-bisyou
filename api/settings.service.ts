"use client"

import { ApiErrorHandler } from "@/@types/ApiError"
import { Prisma, Settings } from "@prisma/client"
import { toast } from "sonner"

interface SettingsPorps {
  update: (data: Prisma.SettingsUpdateInput, id: number) => void
}

const urlPath = `/api/settings`

export const settings: SettingsPorps = {
  async update(
    data: Prisma.SettingsUpdateInput,
    id: number,
  ): Promise<Settings> {
    try {
      const options: RequestInit = {
        method: "PUT",
        body: JSON.stringify(data),
      }

      const req = await fetch(`${urlPath}/update?id=${id}`, options)

      if (!req.ok) {
        const error: ApiErrorHandler = await req.json()

        toast.error(`Erro`, {
          description: error.message,
          action: {
            label: `Fechar`,
            onClick: console.log,
          },
        })
      }

      const res: Settings = await req.json()

      toast.success(`sucesso`, {
        description: `Informações atualizadas com sucesso!`,
        action: {
          label: "Fechar",
          onClick: console.log,
        },
      })

      return res
    } catch (error: any) {
      toast.error(`Erro`, {
        description: error.message,
        action: {
          label: `Fechar`,
          onClick: console.log,
        },
      })
      return Promise.reject(error)
    }
  },
}
