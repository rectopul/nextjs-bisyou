"use client";

import { Settings } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ApiErrorHandler } from "@/@types/ApiError";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SettingsFormProps {
    settings: Settings;
}

export function MissionForm({ settings }: SettingsFormProps) {
    const { register, handleSubmit, setValue } = useForm<Settings>();

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

    useEffect(() => {
        setValue("storename", settings.storename);
    }, [settings]);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmitForm)}
                className="w-full flex flex-col gap-2 [&_input]:focus-visible:!ring-0 [&_*]:focus-visible:!shadow-none [&_input]:focus-visible:!ring-offset-0"
            >
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Titulo</Label>
                        <Input
                            id="name"
                            placeholder="Titulo da sessão de perceiros"
                            className="outline-none h-9 !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
                            defaultValue={settings.section_partners_title || ""}
                            {...register("section_partners_title")}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Conteúdo</Label>
                        <Textarea
                            id="name"
                            placeholder="Missão da empresa"
                            className="outline-none min-h-[93px] !py-1 focus:outline-none active:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!shadow-none"
                            defaultValue={settings.section_partners || ""}
                            {...register("section_partners")}
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
