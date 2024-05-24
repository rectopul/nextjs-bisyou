"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/Spinner";
import { Pages } from "@/api/pagesController";

export interface CreateCategoryPayload {
    title: string;
    description: string;
}

const page_controller = new Pages();

export function CreateCategoryForm() {
    const [cookieValue, setCookieValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, reset } = useForm<CreateCategoryPayload>();

    const onSubmit: SubmitHandler<CreateCategoryPayload> = async (data) => {
        try {
            setIsLoading(true);
            const page = await page_controller.storeCategory(data, cookieValue);
            reset();

            toast.success(`Categoria criada com sucesso!`, {
                description: `Sua página foi criada com sucesso e já está disponível`,
                action: { label: "fechar", onClick: () => null },
            });

            setIsLoading(false);
            console.log(`categoria criada`, page);
        } catch (error: any) {
            toast.error(error.message);
            console.log(`erro ao criar pagina`, error);
        }
    };

    const getCookie = async () => {
        const value = await localStorage.getItem("authToken");

        console.log(value);
        setCookieValue(String(value));
    };

    useEffect(() => {
        // Pegue o valor do cookie chamado 'exampleCookie'
        getCookie();
    }, []);

    return (
        <>
            <div className="mt-12 mb-8 flex flex-col gap-12 !font-sans">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block !font-sans antialiased tracking-normal text-base font-semibold leading-relaxed text-white">
                            Criar nova categoria de página
                        </h6>
                    </div>

                    <div className="p-6 px-0 pt-0 pb-6">
                        <div className="w-full px-6">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-5"
                            >
                                <div className="flex justify-between">
                                    <div className="flex-1 flex flex-col gap-5">
                                        <div className="flex flex-col gap-2 font-medium text-slate-800">
                                            <label htmlFor="title">
                                                Titulo
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-sm border border-slate-200 px-4 h-[40px]"
                                                placeholder="Titulo da categoria"
                                                {...register("title", {
                                                    required: true,
                                                })}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 font-medium text-slate-800">
                                            <label htmlFor="title">
                                                Descrição
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-sm border border-slate-200 px-4 h-[40px]"
                                                placeholder="Descrição da categoria"
                                                {...register("description", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="default"
                                    className="max-w-[200px]"
                                    type="submit"
                                >
                                    {isLoading && (
                                        <span className="mr-1">
                                            <Spinner size="md" />
                                        </span>
                                    )}
                                    Salvar
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
