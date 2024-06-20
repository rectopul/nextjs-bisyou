"use client";

import { Settings } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ApiErrorHandler } from "@/@types/ApiError";
import { toast } from "sonner";

interface SettingsFormProps {
    settings: Settings;
}

export function StoreForm({ settings }: SettingsFormProps) {
    const { register, handleSubmit } = useForm<Settings>();

    const onSubmitForm: SubmitHandler<Settings> = async (data) => {
        try {
            const options: RequestInit = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            const req = await fetch(`/api/settings/${settings.id}`, options);

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

            await req.json();
            toast.success("Sucesso!", {
                description: `Configurações atualizadas com sucesso!`,
                action: {
                    label: "fechar",
                    onClick: () => console.log("fechar"),
                },
            });

            return;
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
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmitForm)}
                className="w-full flex flex-col gap-2 [&_input]:focus-visible:!ring-0 [&_*]:focus-visible:!shadow-none [&_input]:focus-visible:!ring-offset-0"
            >
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Nome da sua loja"
                            className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
                            defaultValue={settings.storename}
                            {...register("storename")}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">
                            Telefone{" "}
                            <span className="text-xs text-red-400">
                                ficara visivel para os clientes
                            </span>
                        </Label>
                        <Input
                            id="phone"
                            placeholder="Telefone (ficará visível para os clientes)"
                            className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
                            inputMode="numeric"
                            defaultValue={settings.phone || ""}
                            {...register("phone")}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">
                            Email{" "}
                            <span className="text-xs text-red-400">
                                ficara visivel para os clientes
                            </span>
                        </Label>
                        <Input
                            id="email"
                            placeholder="E-mail (ficará visível para os clientes)"
                            className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
                            type="email"
                            defaultValue={settings.email || ""}
                            {...register("email")}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Produto Destaque </Label>
                        <Input
                            id="product_video"
                            placeholder="Slug do produto com video para destaque na home page"
                            className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
                            type="text"
                            defaultValue={settings.product_video || ""}
                            {...register("product_video")}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">CNPJ </Label>
                        <Input
                            id="product_video"
                            placeholder="CNPJ da empresa"
                            className="outline-none h-9 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
                            type="text"
                            defaultValue={settings.cnpj || ""}
                            {...register("cnpj")}
                        />
                    </div>

                    <div className="items-center py-6 pt-0 flex justify-between">
                        <Button variant="default" type="submit">
                            Atualizar
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
