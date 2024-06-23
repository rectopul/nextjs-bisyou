"use client";

import { DataTable } from "./data-table";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Banners, BannersImage, BannersThumbnail } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";

interface BannersImageWithRelations extends BannersImage {
    thumbnail: BannersThumbnail | null;
}
interface BannersWithRelations extends Banners {
    image: BannersImageWithRelations | null;
}

interface BannersTableProps {
    banners: BannersWithRelations[];
}

export function BannersTable({ banners }: BannersTableProps) {
    const [bann, setBann] = useState<BannersWithRelations[]>(banners);

    const handleDelete = async (id: number) => {
        try {
            const options: RequestInit = {
                method: "DELETE",
            };

            const req = await fetch(`/api/banners/delete?id=${id}`, options);

            if (!req.ok) {
                toast.error(`Erro ao deletar banner`);
            }

            const res: Banners = await req.json();

            const filter = bann.filter((b) => b.id !== id);

            setBann(filter);

            toast.success(`Banner ${res.title} deletado com sucesso`);
        } catch (error: any) {
            toast.error(error.message);
            console.error("Erro ao deletar banner:", error);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <h3>Lista</h3>

                <div>
                    <Table>
                        <TableCaption>Lista de banners.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Preview</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Posição</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Ações
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bann.map((b) => (
                                <TableRow key={`p-b-${b.id}`}>
                                    <TableCell className="font-medium">
                                        {b.id}
                                    </TableCell>
                                    <TableCell>
                                        <figure className="p-2 w-12 h-12 relative bg-white rounded-sm flex justify-center items-center overflow-hidden border border-slate-900">
                                            {b.image && b.image.thumbnail && (
                                                <Image
                                                    src={`/file/${b.image.thumbnail.sm}`}
                                                    width={
                                                        b.image.thumbnail.width
                                                    }
                                                    height={
                                                        b.image.thumbnail.heigth
                                                    }
                                                    className="h-full w-auto max-w-[initial] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                                    alt={b.image.alt}
                                                />
                                            )}
                                        </figure>
                                    </TableCell>
                                    <TableCell>{b.title}</TableCell>
                                    <TableCell className="text-right">
                                        {b.position}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {b.status}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="w-full flex justify-end gap-4">
                                            <Button
                                                onClick={() =>
                                                    handleDelete(b.id)
                                                }
                                                data-action={b.id}
                                                variant="destructive"
                                                className="w-8 h-8"
                                                size="icon"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
