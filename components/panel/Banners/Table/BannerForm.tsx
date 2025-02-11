"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Prisma, Banners } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropZone } from "@/components/DropZone"
import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"
import { BannersWithImages } from "@/app/page"
import { Spinner } from "@/components/Spinner"

interface CreateBannerProps {
  onCreate: (data: BannersWithImages) => void
}

export function CreateBanner({ onCreate }: CreateBannerProps) {
  const [desktopFile, setDesktopFile] = useState<File | null>(null)
  const [mobileFile, setMobileFile] = useState<File | null>(null)
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const handleDesktopFile = useCallback((file: File) => {
    setDesktopFile(file)
  }, [])

  const handleMobileFile = useCallback((file: File) => {
    setMobileFile(file)
  }, [])

  const formRef = useRef<HTMLFormElement>(null)

  const triggerSubmit = async () => {
    if (!formRef.current) return

    setIsLoad(true)

    const formData = new FormData(formRef.current)

    const position = formData.get("position")
    const title = formData.get("title")

    if (!title || title === "") {
      setIsLoad(false)
      return toast.info(`Atenção`, {
        description: "Informe o titulo do banner",
        action: {
          label: "fechar",
          onClick: () => console.log,
        },
      })
    }

    if (!position || position === "") {
      setIsLoad(false)
      return toast.info(`Atenção`, {
        description: "Selecione a posição do banner",
        action: {
          label: "fechar",
          onClick: () => console.log,
        },
      })
    }

    if (!desktopFile) {
      setIsLoad(false)
      return toast.info(`Atenção`, {
        description: "Selecione o arquivo de imagem",
        action: {
          label: "fechar",
          onClick: () => console.log,
        },
      })
    }

    if (position) {
      if (position !== "medium" && !mobileFile) {
        if (!desktopFile) {
          setIsLoad(false)
          return toast.info(`Atenção`, {
            description: "Selecione a versão desktop da imagem",
            action: {
              label: "fechar",
              onClick: () => console.log,
            },
          })
        }

        if (!mobileFile) {
          setIsLoad(false)
          return toast.info(`Atenção`, {
            description: "Selecione a versão mobile da imagem",
            action: {
              label: "fechar",
              onClick: () => console.log,
            },
          })
        }
      }
    }

    try {
      const options: RequestInit = {
        method: "POST",
        body: formData,
      }

      const req = await fetch(`/api/banners`, options)

      if (!req.ok) {
        return toast.error(`Erro ao cadastrar banner`)
      }

      const res: BannersWithImages = await req.json()

      onCreate(res)
      setIsLoad(false)
      return toast.success(`Banner ${res.title} cadastrado com sucesso!`)
    } catch (error) {
      console.log(`erro ao cadastrar banner`, error)
      setIsLoad(false)
      return toast.error(`Erro ao cadastrar banner`)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)

    console.log(`dados do formulário`, formData.get("file"))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-end">Novo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo banner?</DialogTitle>
          <DialogDescription>
            Utilize o formulário abaixo para criar um novo banner.
          </DialogDescription>
        </DialogHeader>

        <div>
          <form
            className="w-full px-2 py-3 flex flex-col gap-4"
            ref={formRef}
            onSubmit={onSubmit}
          >
            <div>
              <Input placeholder="Nome do banner" name="title" required />
            </div>

            <div>
              <Input
                placeholder="Link do banner"
                name="url"
                type="url"
                inputMode="url"
                required
              />
            </div>

            <div>
              <Select name="position">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="full">Full Banner</SelectItem>
                    <SelectItem value="medium">Icones</SelectItem>
                    <SelectItem value="mini">Mini Banner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <span className="font-light text-slate-600">Desktop</span>
                <DropZone
                  key={`dropBanner1`}
                  onDragFile={handleDesktopFile}
                  showMessage={false}
                  size="small"
                  id="file"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-light text-slate-600">Mobile</span>
                <DropZone
                  key={`dropBanner2`}
                  onDragFile={handleMobileFile}
                  showMessage={false}
                  size="small"
                  id="mobile"
                />
              </div>
            </div>
          </form>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" className="ml-2" onClick={triggerSubmit}>
            {isLoad ? <Spinner size="md" /> : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
