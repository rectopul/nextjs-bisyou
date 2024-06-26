"use client"

import { Prisma, User } from "@prisma/client"
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { ApiErrorHandler } from "@/@types/ApiError"
import { useRef } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"

interface AccountItemProps {
  user: User
}

interface UserUpdateInput extends Prisma.UserUpdateInput {
  currentPassword: string
  password: string
}

export function AccountItem({ user }: AccountItemProps) {
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    reset: resetUser,
  } = useForm<UserUpdateInput>()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onSubmit: SubmitHandler<UserUpdateInput> = async (data) => {
    try {
      const options: RequestInit = {
        method: "PUT",
        body: JSON.stringify(data),
      }

      const req = await fetch(`/api/user/update?id=${user.id}`, options)

      if (!req.ok) {
        const error: ApiErrorHandler = await req.json()
        toast.error(error.message)
      }

      const res: User = await req.json()

      toast.success(`${res.name} atualizado com sucesso!`)
      resetUser()

      if (buttonRef.current) {
        buttonRef.current.click()
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const triggerSubmit = () => handleSubmitUser(onSubmit)()

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center text-blue-gray-500 gap-1 hover:bg-blue-gray-500/10 px-3 h-10 rounded-lg font-light text-sm hover:text-blue-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          {user.name}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Atualizar usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Utilize o formulario abaixo para atualizar o usuário.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="w-full">
            <form
              className="w-full flex flex-col gap-4 font-light text-xs"
              onSubmit={handleSubmitUser(onSubmit)}
            >
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="name" className="text-[14px] font-light">
                  Nome
                </label>
                <Input
                  className="h-9 focus-visible:ring-offset-0 focus-visible:ring-0"
                  id="name"
                  placeholder="Nome"
                  {...registerUser("name", {
                    required: true,
                  })}
                />
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="currentPassword"
                  className="text-[14px] font-light"
                >
                  Senha atual
                </label>
                <Input
                  className="h-9 focus-visible:ring-offset-0 focus-visible:ring-0"
                  id="currentPassword"
                  placeholder="Senha atual"
                  type="password"
                  autoComplete="new-password"
                  {...registerUser("currentPassword", {
                    required: true,
                  })}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label htmlFor="password" className="text-[14px] font-light">
                  Nova senha
                </label>
                <Input
                  className="h-9 focus-visible:ring-offset-0 focus-visible:ring-0"
                  placeholder="Nova senha"
                  type="password"
                  {...registerUser("password", {
                    required: true,
                  })}
                />
              </div>
            </form>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={triggerSubmit}>Atualizar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
