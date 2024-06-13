"use client";

import { Button } from "@/components/ui/button";
import { ShopLocations } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ShopsLo = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export const columns: ColumnDef<ShopLocations>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "address_line1",
        header: "Endereço",
    },
    {
        accessorKey: "city",
        header: "Cidade",
    },
    {
        accessorKey: "state",
        header: "Estado",
    },
    {
        accessorKey: `id-actions`,
        header: "Ação",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <div className="w-full flex gap-2 items-center">
                    <Button
                        size="icon"
                        variant="destructive"
                        className="w-7 h-7 p-0"
                        data-id={id}
                    >
                        <Trash2 size={12} strokeWidth={3} />
                    </Button>
                </div>
            );
        },
    },
];
