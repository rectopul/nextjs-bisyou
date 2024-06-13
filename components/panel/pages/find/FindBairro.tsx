"use client";

import { ShopLocations } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BairroValue } from "./FindContainer";

interface FindBairroProps {
    addresses: ShopLocations[];
    bairros: BairroValue[];
}

export function FindBairro({ addresses, bairros }: FindBairroProps) {
    return (
        <>
            <div className="w-full flex justify-between items-center text-bisyou-font py-6 my-4 border-b border-bisyou-yellow">
                <span>
                    {addresses.length} lojas no bairro <span></span>
                </span>

                <div className="flex items-center gap-3">
                    <span>Localize por:</span>
                    <Select>
                        <SelectTrigger className="w-full md:w-[200px] border-none h-9 bg-bisyou-yellow text-bisyou-font rounded-full font-medium">
                            <SelectValue placeholder="Bairro" />
                        </SelectTrigger>
                        <SelectContent>
                            {bairros.map((b, k) => (
                                <SelectItem value="light" key={`brr-${k}`}>
                                    {b.address_line2}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
}
