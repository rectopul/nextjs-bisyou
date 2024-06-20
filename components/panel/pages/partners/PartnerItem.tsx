"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Partners } from "@prisma/client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { UpdatePartner } from "./UpdatePartner";
import { toast } from "sonner";
import { ImageDown, ImageUp } from "lucide-react";
import { UpdateImagePartner } from "./UpdateImagePartner";
import { Spinner } from "@/components/Spinner";
import { ApiErrorHandler } from "@/@types/ApiError";

interface PartnerItemProps {
    partner: Partners;
    onRemove: (p: number) => void;
}

export function PartnerItem({ partner, onRemove }: PartnerItemProps) {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [parceiro, setParceiro] = useState<Partners>(partner);
    const ref = useRef<HTMLTextAreaElement>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpdateImage = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            setIsLoad(true);
            if (e.currentTarget.files) {
                const partner = await UpdateImagePartner(
                    e.currentTarget.files[0],
                    parceiro.id
                );
                setParceiro(partner);
                toast.success(`Parceiro atualizado com sucesso!`);
            }
            setIsLoad(false);
        } catch (error: any) {
            toast.error(error.message);
            setIsLoad(false);
        }
    };

    const handleDeletePartner = async () => {
        try {
            setIsLoad(true);
            const options: RequestInit = {
                method: "DELETE",
            };

            const req = await fetch(`/api/partner/${parceiro.id}`, options);

            if (!req.ok) {
                const error: ApiErrorHandler = await req.json();

                toast.error(error.message);
            }

            const parc: Partners = await req.json();

            onRemove(parc.id);

            toast.success(`Parceiro ${parc.title} excluido com sucesso`);
            setIsLoad(false);
        } catch (error: any) {
            toast.error(error.message);
            setIsLoad(false);
        }
    };

    const handleFileClick = () => {
        // Dispara o clique no input file
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpdatePartner = async () => {
        try {
            setIsLoad(true);
            if (ref.current && ref.current.value) {
                const partner = await UpdatePartner(
                    ref.current.value,
                    parceiro.id
                );
                setParceiro(partner);

                toast.success(`Parceiro atualizado com sucesso!`);
            }
            setIsLoad(false);
        } catch (error: any) {
            toast.error(error.message);
            setIsLoad(false);
        }
    };

    return (
        <>
            <span className="hidden">
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleUpdateImage}
                    ref={fileInputRef}
                />
            </span>
            <Card className="w-[380px] justify-between flex-col flex">
                <CardHeader>
                    <CardTitle>{`#${parceiro.id}`}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-4">
                    <figure className="border border-slate-200 p-4 group rounded-md text-center relative overflow-hidden">
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
                            src={`/file/${parceiro.image}`}
                            width={200}
                            height={200}
                            alt={parceiro.slug}
                            className="m-auto"
                        />
                    </figure>

                    <Textarea
                        name="description"
                        id="description"
                        ref={ref}
                        defaultValue={parceiro.text || ""}
                    />
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4 mt-auto self-baseline">
                    <Button
                        variant="destructive"
                        className="self-baseline mt-auto"
                        onClick={() => handleDeletePartner()}
                    >
                        Excluir
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleUpdatePartner}
                        className="self-baseline mt-auto"
                    >
                        Atualizar
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
