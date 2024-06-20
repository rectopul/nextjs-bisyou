"use client";

import { Partners } from "@prisma/client";
import { PartnerItem } from "./PartnerItem";
import { useState } from "react";
import { FormPartners } from "./FormPartners";

interface PartnersListProps {
    partners: Partners[];
}

export function PartnersList({ partners }: PartnersListProps) {
    const [list, setList] = useState<Partners[]>(partners);

    const handleRemove = (id: number) => {
        const filter = list.filter((p) => p.id !== id);
        setList(filter);
    };

    const onInsert = (p: Partners) => {
        setList((prev) => [p, ...prev]);
    };

    return (
        <>
            <div className="w-full flex justify-between">
                <h2 className="text-hd-3">Parceiros</h2>
                <FormPartners onInsert={onInsert} />
            </div>
            <div className="">
                <div className="w-full grid grid-cols-4 grid-rows-[auto] gap-5">
                    {list.map((p) => (
                        <PartnerItem
                            key={`ptn-${p.id}`}
                            partner={p}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
