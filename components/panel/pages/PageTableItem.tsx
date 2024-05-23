"use client";

import { PageResponse } from "@/@types/PageResponse";
import { Pages } from "@/api/pagesController";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";

interface PageTableItemProps {
    page: PageResponse;
}

const pageContoller = new Pages();

export function PageTableItem({ page }: PageTableItemProps) {
    const handleDeletePage = async () => await pageContoller.delete(page.id);

    return (
        <TableRow key={page.id}>
            <TableCell className="font-medium">
                <Image
                    src={`/file/${page.image.src}`}
                    alt={page.image.alt}
                    width={60}
                    height={60}
                    className="rounded-sm bg-white p-1 border border-slate-200"
                />
            </TableCell>
            <TableCell className="font-medium">{page.id}</TableCell>
            <TableCell>{page.title}</TableCell>
            <TableCell>{page.description}</TableCell>
            <TableCell className="text-right">{page.description}</TableCell>
            <TableCell className="text-right">
                <div className="flex items-center gap-2 justify-end">
                    <Button
                        size="md"
                        className="bg-red-600 border-red-800 border text-white"
                        onClick={handleDeletePage}
                    >
                        <Trash size={14} strokeWidth={2} />
                    </Button>

                    <Button
                        size="md"
                        className="bg-blue-500 border-blue-600 border text-white"
                    >
                        <Pencil size={14} strokeWidth={2} />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
