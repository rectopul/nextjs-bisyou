"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pages as PagesController } from "@/api/pagesController";
import { Pages, ImagePages } from "prisma/prisma-client";

export interface PageWithImage extends Pages {
    image: ImagePages | null;
}

interface PagesTableProps {
    pages: PageWithImage[];
}

const pageContoller = new PagesController();

export function PagesTable({ pages }: PagesTableProps) {
    const [pageList, setPageList] = useState<PageWithImage[] | null>(pages);
    const handleDeletePage = async (id: number) => {
        await pageContoller.delete(id);
        setPageList((prev) => (prev ? prev.filter((i) => i.id !== id) : null));
    };

    return (
        <Table>
            <TableCaption>
                Listagem de todas as páginas cadastradas.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Imagem</TableHead>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Açoes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pageList &&
                    pageList.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell className="font-medium">
                                {p.image && (
                                    <Image
                                        src={`/file/${p.image.src}`}
                                        alt={p.image.alt}
                                        width={60}
                                        height={60}
                                        className="rounded-sm bg-white p-1 border border-slate-200"
                                    />
                                )}
                            </TableCell>
                            <TableCell className="font-medium">
                                {p.id}
                            </TableCell>
                            <TableCell>{p.title}</TableCell>
                            <TableCell>{p.description}</TableCell>
                            <TableCell className="text-right">
                                {p.status === "ativo" ? (
                                    <span className="px-3 py-1 bg-green-500 text-white rounded-full leading-5 text-xs">
                                        {p.status}
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-slate-600 text-white rounded-full leading-5 text-xs">
                                        {p.status}
                                    </span>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center gap-2 justify-end">
                                    <Button
                                        size="md"
                                        className="bg-red-600 border-red-800 border text-white"
                                        onClick={() => handleDeletePage(p.id)}
                                    >
                                        <Trash size={14} />
                                    </Button>

                                    <Button
                                        size="md"
                                        className="bg-blue-500 border-blue-600 border text-white"
                                    >
                                        <Pencil size={14} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
