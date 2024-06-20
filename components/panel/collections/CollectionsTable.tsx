import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { listCollections } from "@/shopify";
import { Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/client";
import { CollectionItem } from "./CollectionItem";

export async function CollectionsTable() {
    const shopifyCollections = await listCollections();
    const collections = await prisma.colletions.findMany({
        orderBy: { id: "desc" },
    });

    return (
        <Table>
            <TableCaption>Lista de colleçoes da shopify.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Thumbnail</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Posição</TableHead>
                    <TableHead className="text-right">
                        Quantidade de produtos
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {shopifyCollections?.map((c) => {
                    const matchingCollections = collections.filter(
                        (cl) => cl.slug === c.node.handle
                    );
                    const lastMatchingCollection = matchingCollections.at(-1);

                    return (
                        <CollectionItem
                            key={`cll-t-${c.node.id}`}
                            collection={c}
                            prismaCollection={lastMatchingCollection}
                        />
                    );
                })}
            </TableBody>
        </Table>
    );
}
