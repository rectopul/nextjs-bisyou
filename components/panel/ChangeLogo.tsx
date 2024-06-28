"use client"

import { ApiErrorHandler } from "@/@types/ApiError"
import { Settings } from "@prisma/client"
import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { toast } from "sonner"

interface ChangeLogoProps {
  settings: Settings
  onImageChange: (data: Settings) => void
}

const ChangeLogo = forwardRef(
  ({ settings, onImageChange }: ChangeLogoProps, ref) => {
    const inputLogo = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      openFileDialog() {
        inputLogo.current?.click()
      },
    }))

    const updateLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (!inputLogo) return
        const file =
          inputLogo.current && inputLogo.current.files
            ? inputLogo.current.files[0]
            : null
        if (!file) {
          return toast.info("Atençao", {
            description: `Selecione uma imagem`,
            action: {
              label: `Fechar`,
              onClick: console.log,
            },
          })
        }

        const formData = new FormData()
        formData.append("file", file)

        const options: RequestInit = {
          method: "PUT",
          body: formData,
        }

        const req = await fetch(
          `/api/settings/update/image?id=${settings.id}`,
          options,
        )

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

        const setting = await req.json()

        onImageChange(setting)

        return toast.success("Sucesso", {
          description: `Logo alterada com sucesso!`,
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
      <>
        <input
          type="file"
          className="hidden"
          ref={inputLogo}
          onChange={updateLogo}
        />
      </>
    )
  },
)

ChangeLogo.displayName = "ChangeLogo"

export { ChangeLogo }
