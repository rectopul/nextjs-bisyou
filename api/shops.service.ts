import { ApiErrorHandler } from "@/@types/ApiError"
import { Prisma, ShopLocations } from "@prisma/client"
import { toast } from "sonner"

interface ShopsProps {
  update: (
    data: Prisma.ShopLocationsUpdateInput,
    id: number,
  ) => Promise<ShopLocations>
  delete: (id: number) => Promise<ShopLocations>
  create: (data: Prisma.ShopLocationsCreateInput) => Promise<ShopLocations>
}

const urlPath = `/api/shopAddress`

export const shops: ShopsProps = {
  async create(data: Prisma.ShopLocationsCreateInput): Promise<ShopLocations> {
    try {
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
      }

      const req = await fetch(`${urlPath}`, options)

      if (!req.ok) {
        const error: ApiErrorHandler = await req.json()

        toast.error(`Erro`, {
          description: error.message,
          action: {
            label: `Fechar`,
            onClick: console.log,
          },
        })

        return Promise.reject(new Error(error.message))
      }

      const res: ShopLocations = await req.json()

      toast.success(`sucesso`, {
        description: `Cadastro realizado com sucesso!`,
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

  async update(
    data: Prisma.SettingsUpdateInput,
    id: number,
  ): Promise<ShopLocations> {
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

        return Promise.reject(new Error(error.message))
      }

      const res: ShopLocations = await req.json()

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

  async delete(id: number): Promise<ShopLocations> {
    try {
      const options: RequestInit = {
        method: "DELETE",
      }

      const req = await fetch(`${urlPath}/delete?id=${id}`, options)

      if (!req.ok) {
        const error: ApiErrorHandler = await req.json()

        toast.error(`Erro`, {
          description: error.message,
          action: {
            label: `Fechar`,
            onClick: console.log,
          },
        })
        return Promise.reject(new Error(error.message))
      }

      const res: ShopLocations = await req.json()

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
