"use client";

import { CEP } from "@/@types/Cep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Prisma, ShopLocations } from "@prisma/client";
import { X } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormShopLocations {
    onInsert?: (data: ShopLocations) => void;
    onClose: () => void;
}

export function FormShopLocations({ onInsert, onClose }: FormShopLocations) {
    const { register, setValue, handleSubmit } =
        useForm<Prisma.ShopLocationsCreateInput>();
    const handleGetCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        console.log(`length: `, value.length);

        if (value && value.length === 8) {
            const req = await fetch(`//viacep.com.br/ws/${value}/json/`);

            const response: CEP = await req.json();

            console.log(`resposta do cep`, response);

            setValue("street_address", response.logradouro);
            setValue("address_line1", response.logradouro);
            setValue("address_line2", response.bairro);
            setValue("city", response.localidade);
            setValue("state", response.uf);
        }
    };

    const onSubmit: SubmitHandler<Prisma.ShopLocationsCreateInput> = async (
        data
    ) => {
        const url = `/api/shopAddress`;
        const options: RequestInit = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const req = await fetch(url, options);

        if (!req.ok) {
            const error = await req.json();
            toast.error(`erro ao cadastrar loja`, {
                description: error.name,
                action: {
                    label: "fechar",
                    onClick: (v) => console.log,
                },
            });
        }

        const address: ShopLocations = await req.json();

        onInsert && onInsert(address);
    };

    return (
        <>
            <div className="w-full h-full bg-black bg-opacity-65 fixed left-0 top-0 z-50">
                <div className="w-[90%] z-20 max-w-[600px] p-6 rounded-lg shadow fixed md:top-14 left-1/2 -translate-x-1/2 bg-white">
                    <form
                        className="w-full flex flex-col gap-5 relative"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <span
                            onClick={() => onClose()}
                            className="w-7 h-7 cursor-pointer rounded-md flex justify-center hover:bg-red-600 items-center bg-red-500 text-white absolute right-0 top-0"
                        >
                            <X size={16} strokeWidth={3} />
                        </span>
                        <div className="w-full">
                            <Input
                                {...register("postal_code", { required: true })}
                                className="h-9 max-w-[50%]"
                                onChange={handleGetCep}
                                placeholder="CEP"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                {...register("name")}
                                className="h-9"
                                placeholder="Nome da loja"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                {...register("address_line1")}
                                className="h-9"
                                placeholder="Endereço"
                            />
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <Input
                                {...register("address_line2")}
                                className="h-9"
                                placeholder="Bairro"
                            />
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <Input
                                {...register("city")}
                                className="h-9"
                                placeholder="Cidade"
                            />

                            <Input
                                {...register("street_number", {
                                    valueAsNumber: true,
                                })}
                                className="h-9"
                                placeholder="Número"
                            />

                            <Input
                                {...register("state")}
                                className="h-9"
                                placeholder="Estado"
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                {...register("maps_url", { required: true })}
                                className="h-9"
                                placeholder="URL do Google Maps"
                            />
                        </div>

                        <div className="w-full">
                            <Button type="submit" size="sm" variant="default">
                                Cadastrar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
