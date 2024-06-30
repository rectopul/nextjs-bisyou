"use client"

import { ApiErrorHandler } from "@/@types/ApiError"
import { BannersWithImages } from "@/app/page"
import { DropZone } from "@/components/DropZone"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

interface BannersImagePayload {
  file?: File
  mobile?: File
}

interface BannerFormImageProps {
  banner: BannersWithImages
  onClose: () => void
  onUpdate: (data: BannersWithImages) => void
}

export function BannerFormImage({
  banner,
  onClose,
  onUpdate,
}: BannerFormImageProps) {
  const [isLoad, setIsload] = useState<boolean>(false)
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setValueEdit,
    formState: { errors: errorsEdit },
  } = useForm<BannersImagePayload>()

  const onSubmit: SubmitHandler<BannersImagePayload> = async (data) => {
    try {
      setIsload(true)
      if (!data.file && !data.mobile) {
        return setIsload(false)
      }

      const formData = new FormData()

      data.file && formData.append("file", data.file)
      data.mobile && formData.append("mobile", data.mobile)

      const optionns: RequestInit = {
        method: "PUT",
        body: formData,
      }

      const req = await fetch(
        `/api/banners/update/image?id=${banner.id}`,
        optionns,
      )

      if (!req.ok) {
        const error: ApiErrorHandler = await req.json()
        setIsload(false)
        return toast.error(`Erro`, {
          description: error.message,
          action: {
            label: `Fechar`,
            onClick: console.log,
          },
        })
      }

      const res: BannersWithImages = await req.json()

      toast.success(`Sucesso!`, {
        description: `Banner ${res.title} atualizado com sucesso!`,
        action: {
          label: `Fechar`,
          onClick: console.log,
        },
      })
      setIsload(false)
      onClose()
      return onUpdate(res)
    } catch (error: any) {
      setIsload(false)
      return toast.error(`Erro`, {
        description: error.message,
        action: {
          label: `Fechar`,
          onClick: console.log,
        },
      })
    }
  }

  useEffect(() => {
    registerEdit("file", { required: true })
    registerEdit("mobile", { required: false })
  }, [registerEdit])

  return (
    <div className="w-full h-full bg-black/40 z-30  fixed top-0 left-0 flex justify-center items-center shadow">
      <form
        action=""
        onSubmit={handleSubmitEdit(onSubmit)}
        className="w-[490px] duration-300 relative rounded-lg p-5 !flex flex-col gap-4 bg-white slide-in-from-top-1/4 animate-in"
      >
        <button
          className="absolute right-3 w-7 h-7 flex justify-center items-center top-3 rounded-sm bg-red-500 text-white"
          onClick={onClose}
          type="button"
        >
          <X size={16} strokeWidth={3} />
        </button>
        <div className="w-full text-center text-slate-900 text-xl">
          Alterar imagens banner {banner.title}
        </div>

        <small>Altere as imagens dos banners</small>

        <div className="grid grid-cols-2 gap-2">
          <DropZone
            size="small"
            showMessage={false}
            id="file"
            onDragFile={(file) => setValueEdit("file", file)}
          />

          <DropZone
            size="small"
            showMessage={false}
            id="mobile"
            onDragFile={(file) => setValueEdit("mobile", file)}
          />
        </div>

        <Button className="self-start" type="submit">
          {isLoad ? <Spinner fill="#FFFFFF" size="sm" /> : "Atualizar"}
        </Button>
      </form>
    </div>
  )
}
