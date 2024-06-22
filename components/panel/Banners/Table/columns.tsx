"use client";

import { Button } from "@/components/ui/button";
import { Banners, BannersImage, BannersThumbnail } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, Trash2 } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface BannersImageWithRelations extends BannersImage {
    thumbnail: BannersThumbnail | null;
}
interface BannersWithRelations extends Banners {
    image: BannersImageWithRelations | null;
}

export const columns: ColumnDef<BannersWithRelations>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "image.thumbnail.id",
        header: "Preview",
        cell: ({ row }) => {
            if (!row.original.image || !row.original.image.thumbnail) return;

            const { alt, sm, heigth, width } = row.original.image.thumbnail;

            return (
                <>
                    <figure className="p-2 w-12 h-12 relative bg-white rounded-sm flex justify-center items-center overflow-hidden border border-slate-900">
                        <Image
                            src={`/file/${sm}`}
                            width={width}
                            height={heigth}
                            className="h-full w-auto max-w-[initial] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            alt={alt}
                        />
                    </figure>
                </>
            );
        },
    },
    {
        accessorKey: "title",
        header: "Nome",
    },
    {
        accessorKey: "position",
        header: "Posição",
    },
    {
        accessorKey: "status",
        header: "Posição",
    },
    {
        accessorKey: "image.id",
        header: "Açoes",
        cell: ({ row }) => {
            return (
                <>
                    <div className="w-full flex justify-end gap-4">
                        <Button
                            data-action={row.original.id}
                            variant="destructive"
                            className="w-8 h-8"
                            size="icon"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </>
            );
        },
    },
];
