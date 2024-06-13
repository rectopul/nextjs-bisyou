"use client";

import { SlidersHorizontal } from "lucide-react";
import {
    CitiValue,
    FiltersAddressType,
    FindFilters,
    StateValue,
} from "./Filters";
import { FindBairro } from "./FindBairro";
import { AddressesList } from "./AddressesList";
import { ShopLocations } from "@prisma/client";
import { useEffect, useState } from "react";

export interface BairroValue {
    address_line2: string;
}

interface FindContainerProps {
    addresses: ShopLocations[];
    cities: CitiValue[];
    states: StateValue[];
    bairros: BairroValue[];
}

export function FindContainer({
    addresses,
    cities,
    states,
    bairros,
}: FindContainerProps) {
    const [filters, setFilters] = useState<FiltersAddressType | null>(null);
    const [filtreds, setFiltreds] = useState<ShopLocations[] | null>(null);
    const filterAddresses = (values: FiltersAddressType) => {
        const filtred = addresses.filter((ad) => {
            if (values.type === "city" && ad.city === values.value) {
                return ad;
            }

            if (values.type === "state" && ad.state === values.value) {
                return ad;
            }
        });

        setFiltreds(filtred);
    };

    useEffect(() => {
        setFilters(filters);
    }, [filters]);
    return (
        <>
            <div className="w-4/12 flex flex-col gap-5">
                <h2 className="text-lg w-full font-semibold text-bisyou-font flex justify-between items-center">
                    <span>Filtrar por</span>

                    <span>
                        <SlidersHorizontal />
                    </span>
                </h2>

                <FindFilters
                    cities={cities}
                    states={states}
                    onSelect={filterAddresses}
                />
            </div>

            <div className="flex flex-col gap-5">
                <div className="w-full md:h-[400px] overflow-hidden flex justify-center items-center">
                    <div
                        className="w-full"
                        dangerouslySetInnerHTML={{
                            __html: addresses[0].maps_url,
                        }}
                    ></div>
                </div>

                <FindBairro addresses={addresses} bairros={bairros} />
                {filtreds ? (
                    <AddressesList addresses={filtreds} filter={filters} />
                ) : (
                    <AddressesList addresses={addresses} filter={filters} />
                )}
            </div>
        </>
    );
}
