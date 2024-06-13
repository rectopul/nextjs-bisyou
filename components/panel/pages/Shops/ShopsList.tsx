"use client";

import { ShopLocations } from "@prisma/client";
import { DataTable } from "./Table";
import { columns } from "./collumns";
import { Button } from "@/components/ui/button";
import { FormShopLocations } from "./Form";
import { useState } from "react";

interface ShopsListProps {
    stores: ShopLocations[];
}

export function ShopsList({ stores }: ShopsListProps) {
    const [shops, setShops] = useState<ShopLocations[]>(stores);
    const [showInsert, setShowInsert] = useState<boolean>(false);

    return (
        <div className="w-full mx-auto py-10 flex flex-col gap-5">
            <div className="w-full justify-center items-center">
                <Button size="sm" onClick={() => setShowInsert(!showInsert)}>
                    Cadastrar
                </Button>
                {showInsert && (
                    <FormShopLocations
                        onClose={() => setShowInsert(!showInsert)}
                        onInsert={(value) =>
                            setShops((prev) => [value, ...prev])
                        }
                    />
                )}
            </div>
            <DataTable columns={columns} data={shops} />
        </div>
    );
}
