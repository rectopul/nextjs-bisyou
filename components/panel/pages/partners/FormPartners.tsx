"use client";

import { ApiErrorHandler } from "@/@types/ApiError";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Partners, Prisma } from "@prisma/client";
import { ImageUp, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface PartnerCreateInput extends Prisma.PartnersCreateInput {
    file: File;
}

interface FormPartnersProps {
    onInsert: (p: Partners) => void;
}

export function FormPartners({ onInsert }: FormPartnersProps) {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [visible, SetVisible] = useState<boolean>(false);
    const [image, setImage] = useState<string>("https://placehold.co/400x200");
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PartnerCreateInput>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const submitPartner: SubmitHandler<PartnerCreateInput> = async (data) => {
        try {
            setIsLoad(true);

            const formData = new FormData();

            console.log(`imagem`, getValues("file"));

            formData.append("file", data.file);
            formData.append("title", data.title);
            formData.append("text", data.text || "");

            const options: RequestInit = {
                method: "POST",
                body: formData,
            };

            const req = await fetch(`/api/partner`, options);

            if (!req.ok) {
                const error: ApiErrorHandler = await req.json();

                toast.error(error.message);
            }

            const partner: Partners = await req.json();
            setImage(partner.image);
            onInsert(partner);
            setImage("https://placehold.co/400x200");
            reset();
            toast.success(`Parceiro atualizado com sucesso!`);

            setIsLoad(false);
            SetVisible(!visible);
        } catch (error: any) {
            toast.error(error.message);
            setIsLoad(false);
        }
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            toast.error(`nenhuma imagem selecionada`);
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result as string);
            setValue("file", file);
        };

        reader.onerror = () => {
            toast.error(`Failed to read file`);
        };
        reader.readAsDataURL(file);
    };

    const handleFileClick = () => {
        // Dispara o clique no input file
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Button onClick={() => SetVisible(!visible)}>Novo</Button>
            {visible && (
                <div className="w-full z-20 flex justify-center items-center bg-black bg-opacity-60 fixed left-0 top-0 h-full px-4">
                    <form
                        onSubmit={handleSubmit(submitPartner)}
                        className="w-full max-w-[400px] bg-white rounded-lg shadow flex flex-col gap-4 relative"
                    >
                        <button
                            onClick={() => SetVisible(!visible)}
                            className="absolute right-3 top-3 bg-red-500 text-white rounded-sm p-1 w-5 h-5 flex justify-center items-center"
                        >
                            <X size={18} />
                        </button>
                        <input
                            type="file"
                            {...register("file", { required: true })}
                            onChange={handleChangeImage}
                            className="hidden"
                            ref={fileInputRef}
                        />
                        <Card className="w-full justify-between flex-col flex">
                            <CardHeader>
                                <CardTitle>Criar novo parceiro</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4 p-4">
                                <figure className="border border-slate-200 w-[300px] p-2 mx-auto group rounded-md text-center relative overflow-hidden">
                                    {isLoad && (
                                        <span className="absolute top-1 left-2">
                                            <Spinner size="sm" />
                                        </span>
                                    )}

                                    <span
                                        onClick={handleFileClick}
                                        className="w-5 h-5 absolute cursor-pointer hover:text-koromiko-500 transition-all duration-300 right-2 -top-5 group-hover:top-1"
                                    >
                                        <ImageUp size={18} />
                                    </span>

                                    <Image
                                        src={image}
                                        width={300}
                                        height={200}
                                        alt="placeholder image"
                                        className="m-auto"
                                        unoptimized
                                    />
                                    {errors.file && (
                                        <span className="w-full text-xs text-white bg-red-500 text-center p-1 rounded-sm">
                                            Selecione a imagem
                                        </span>
                                    )}
                                </figure>

                                <Input
                                    {...register("title", { required: true })}
                                    placeholder="Nome do parceiro"
                                />
                                {errors.title && (
                                    <span className="w-full text-xs text-white bg-red-500 text-center p-1 rounded-sm">
                                        informe um titulo para o parceiro
                                    </span>
                                )}

                                <Textarea
                                    id="text"
                                    {...register("text", { required: true })}
                                    placeholder="Descrição do parceiro"
                                />
                                {errors.text && (
                                    <span className="w-full text-xs text-white bg-red-500 text-center p-1 rounded-sm">
                                        informe um texto para o parceiro
                                    </span>
                                )}
                            </CardContent>
                            <CardFooter className="gap-4 mt-auto">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    type="submit"
                                >
                                    Criar
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            )}
        </>
    );
}
