"use client";

import { DropZone } from "@/components/DropZone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Prisma } from "@prisma/client";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface BannerFormPayload extends Prisma.BannersCreateInput {
    file: File;
    mobileFile: File;
}

export function BannerForm() {
    const { register, setValue, reset, handleSubmit } =
        useForm<BannerFormPayload>();

    const onSubmit: SubmitHandler<BannerFormPayload> = async (data) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("url", data.url);
            formData.append("position", data.position);
            formData.append("file", data.file);

            const options = {
                method: "POST",
                body: formData,
            };

            const req = await fetch(`/api/banners`, options);

            if (!req.ok) {
                toast.error(`Erro ao cadastrar banner`);
            }

            const res = await req.json(req);

            toast.success(`Banner cadastrado com sucesso`);

            reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        size="sm"
                        className="h-9 text-hd-4 text-white gap-2 font-normal"
                    >
                        <Plus size={15} strokeWidth={4} />
                        Novo
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-light">
                            Cadastrar Banner
                        </DialogTitle>
                        <DialogDescription className="font-light">
                            Utilize o formulário abaixo para cadastrar novos
                            banners.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 w-full font-light"
                    >
                        <div className="w-full">
                            <Input
                                {...register("title", { required: true })}
                                placeholder="Nome do banner"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>

                        <div className="w-full">
                            <Select
                                onValueChange={(value) =>
                                    setValue("position", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Posição" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="medium">
                                        Mini Banners
                                    </SelectItem>
                                    <SelectItem value="full">
                                        Full Banners
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full">
                            <Input
                                {...register("url", { required: true })}
                                placeholder="Url do banner"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DropZone
                                onDragFile={(file) => setValue("file", file)}
                                showMessage={false}
                            />

                            <DropZone
                                onDragFile={(mobileFile) =>
                                    setValue("mobileFile", mobileFile)
                                }
                                showMessage={false}
                            />
                        </div>

                        <Button>Cadastrar</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
