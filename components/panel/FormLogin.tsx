"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { ApiErrorHandler } from "@/@types/ApiError";
import { toast } from "sonner";
import { ApiUserResponse } from "@/@types/ApiUsers";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

interface FormLoginPayload {
    username: string;
    password: string;
}

export function FormLogin() {
    const [showPass, setShowPass] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLoginPayload>();

    const onSubmit: SubmitHandler<FormLoginPayload> = async (data) => {
        try {
            const options: RequestInit = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            const req = await fetch(`/api/user/login`, options);

            if (req.status > 300) {
                const res: ApiErrorHandler = await req.json();

                toast.error(res.name, {
                    description: res.message,
                    action: {
                        label: "fechar",
                        onClick: () => console.log("fechar"),
                    },
                });

                return;
            }

            const res: ApiUserResponse = await req.json();

            return toast.success(
                `Usuário ${res.user.name} logado com sucesso, redirecionando...`
            );
        } catch (error) {
            const apiError = error as ApiErrorHandler;
            if (apiError.message) {
                toast.error(apiError.name, {
                    description: apiError.message,
                    action: {
                        label: "fechar",
                        onClick: () => console.log("fechar"),
                    },
                });
            } else {
                console.log(error);
                toast.error("Ocorreu um erro inesperado."); // Mensagem genérica para outros tipos de erros
            }
        }
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-5 w-full max-w-[300px] mx-auto"
        >
            <div className="w-full">
                <input
                    type="text"
                    className="px-4 py-2 w-full rounded-lg bg-white border border-slate-200 text-sm outline-none font-normal"
                    placeholder="Login"
                    {...register("username", { required: true })}
                />
            </div>

            <div className="flex w-full items-center bg-white rounded-lg border border-slate-200 text-sm font-normal">
                <input
                    type={showPass ? "text" : "password"}
                    className="px-4 py-2 rounded-lg bg-white text-sm w-[80%] font-normal outline-none"
                    {...register("password", { required: true })}
                    placeholder="Senha"
                />
                <Button
                    onClick={() => setShowPass(!showPass)}
                    type="button"
                    className="text-slate-400 flex-1 bg-transparent border-0 hover:bg-transparent hover:text-slate-900"
                >
                    <Eye size={20} strokeWidth={1} />
                </Button>
            </div>

            <Button className="px-8" type="submit">
                Login
            </Button>
        </form>
    );
}
