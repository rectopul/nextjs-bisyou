"use client";

import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pages } from "@/api/pages";
import { Category } from "@prisma/client";
import { DropZone } from "@/components/DropZone";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/RichText";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Spinner } from "@/components/Spinner";

export interface CreatePagePayload {
    title: string;
    description: string;
    status: string;
    excerpt: string;
    category?: number;
    content: string;
    file: File;
}

const page_controller = new Pages();

export function CreatePageForm() {
    const [cookieValue, setCookieValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, setValue, handleSubmit, reset } =
        useForm<CreatePagePayload>();
    const [categories, setCategories] = useState<Category[] | null>(null);

    const onSubmit: SubmitHandler<CreatePagePayload> = async (data) => {
        try {
            console.log(`meu cookie`, cookieValue);
            setIsLoading(true);
            const page = await page_controller.store(data, cookieValue);
            reset();

            toast.success(`Página criada com sucesso!`, {
                description: `Sua página foi criada com sucesso e já está disponível`,
                action: { label: "fechar", onClick: () => null },
            });

            setIsLoading(false);
            console.log(`página criada`, page);
        } catch (error: any) {
            toast.error(error.message);
            console.log(`erro ao criar pagina`, error);
        }
    };

    const fetchCategories = useCallback(async () => {
        const cats = await page_controller.categories();
        setCategories(cats);
    }, []);

    const getCookie = async () => {
        const value = await localStorage.getItem("authToken");

        console.log(value);
        setCookieValue(String(value));
    };

    useEffect(() => {
        // Pegue o valor do cookie chamado 'exampleCookie'
        getCookie();
    }, []);

    useEffect(() => {
        if (!categories) {
            fetchCategories();
        }
    }, [fetchCategories, categories]);

    // useEffect(() => {
    //     register("content", { required: true });
    // }, [register]);

    return (
        <>
            <div className="mt-12 mb-8 flex flex-col gap-12 !font-sans">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block !font-sans antialiased tracking-normal text-base font-semibold leading-relaxed text-white">
                            Criar nova página
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
                                                placeholder="Titulo da página"
                                                {...register("title", {
                                                    required: true,
                                                })}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 font-medium text-slate-800">
                                            <label htmlFor="title">
                                                Categoria
                                            </label>
                                            <div className="w-full">
                                                {categories && (
                                                    <Select
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            setValue(
                                                                "category",
                                                                parseInt(value)
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full outline-none">
                                                            <SelectValue placeholder="Selecione uma categoria" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            {categories.map(
                                                                (c) => (
                                                                    <SelectItem
                                                                        value={c.id.toString()}
                                                                        key={`cat-page-${c.id}`}
                                                                    >
                                                                        {
                                                                            c.title
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 font-medium text-slate-800">
                                            <label htmlFor="title">
                                                Descrição
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-sm border border-slate-200 px-4 h-[40px]"
                                                placeholder="Descrição da página"
                                                {...register("description", {
                                                    required: true,
                                                })}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 font-medium text-slate-800">
                                            <label htmlFor="title">
                                                Descrição curta
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-sm border border-slate-200 px-4 h-[40px]"
                                                placeholder="Descrição curta da página"
                                                {...register("excerpt", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-2/6 ml-6">
                                        <DropZone
                                            onDragFile={(file) =>
                                                setValue("file", file)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 font-medium text-slate-800">
                                    <label htmlFor="title">Conteúdo</label>

                                    <RichText
                                        onUpdate={(valueHtml) =>
                                            setValue("content", valueHtml)
                                        }
                                    />
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
