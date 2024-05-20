"use client";

import { NewsPayload } from "@/@types/News";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function FormNews() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewsPayload>();

    const newsSubmit: SubmitHandler<NewsPayload> = async (data) => {
        console.log(data);
        toast("Cadastrado com sucesso!");
    };

    if (errors.email) {
        toast("Por favor informe seu E-mail");
    } else if (errors.name) {
        toast("Por favor informe seu Nome");
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(newsSubmit)}
                className="flex flex-col gap-4 max-w-[300px] w-full"
            >
                <div className="h-[50px] w-full bg-white rounded-full">
                    <input
                        type="text"
                        {...register("email", { required: true })}
                        className="h-full w-full px-5 bg-bisyou-default bg-opacity-40 rounded-full outline-none border-none text-bisyou-font"
                        placeholder="E-mail"
                    />
                </div>

                <div className="flex items-center justify-between h-[50px] w-full bg-white rounded-full">
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="h-full w-[72%] px-5 self-start bg-bisyou-default bg-opacity-40 rounded-l-full outline-none border-none text-bisyou-font"
                        placeholder="Nome"
                    />

                    <Button className="rounded-l-none  flex-1 self-end rounded-r-full bg-bisyou-font text-white h-[50px] px-5">
                        enviar
                    </Button>
                </div>
            </form>
        </>
    );
}
