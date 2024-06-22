"use client";

import { DropZone } from "@/components/DropZone";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Prisma } from "@prisma/client";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface BannerFormPayload extends Prisma.BannersCreateInput {
    file: File;
}

export function BannerForm() {
    const { register, setValue, reset, handleSubmit } =
        useForm<BannerFormPayload>();

    const onSubmit: SubmitHandler<BannerFormPayload> = (data) =>
        console.log(data);

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
                        
                        <div>
                            <DropZone
                                onDragFile={(file) => {}}
                                showMessage={false}
                            />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
