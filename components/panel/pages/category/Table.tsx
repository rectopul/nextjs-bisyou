"use client";

import { Category } from "@prisma/client";
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
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { Pages } from "@/api/pages";
import { useState } from "react";

interface CategoriesTableProps {
    categories: Category[];
}

const category_controller = new Pages();

export function CategoriesTable({ categories }: CategoriesTableProps) {
    const [categorys, setCategorys] = useState<Category[]>(categories);
    const handleDeleteCategory = async (id: number) => {
        try {
            await category_controller.deleteCategory(id);

            setCategorys((prev) => prev.filter((i) => i.id !== id));

            toast.success(`Categoria excluida com sucesso`, {
                description: "A categoria foi excluida com sucesso",
                action: {
                    label: `fechar`,
                    onClick: () => null,
                },
            });
        } catch (error: any) {
            toast.error(error.name, {
                description: error.message,
                action: {
                    label: "fechar",
                    onClick: () => null,
                },
            });
        }
    };

    return (
        <Table>
            <TableCaption>
                Listagem de todas as páginas cadastradas.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Açoes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categorys.map((c) => (
                    <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.id}</TableCell>
                        <TableCell>{c.title}</TableCell>
                        <TableCell>{c.description}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                                <Button
                                    size="md"
                                    className="bg-red-600 border-red-800 border text-white"
                                    onClick={() => handleDeleteCategory(c.id)}
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
