"use client";

import { ShopLocations } from "@prisma/client";
import { FiltersAddressType } from "./Filters";
import { useEffect, useState } from "react";

interface AddressesListProps {
    addresses: ShopLocations[];
    filter: FiltersAddressType | null;
}

export function AddressesList({ addresses, filter }: AddressesListProps) {
    const [addressesListFilter, setAddressesFilter] = useState<
        ShopLocations[] | null
    >(null);

    const filterAddresses = (values: FiltersAddressType) => {
        if (addresses) {
            const filtred = addresses.map((add) => {
                if (values.type == "state" && add.state === values.value) {
                    return add;
                }

                if (values.type == "city" && add.city === values.value) {
                    return add;
                }

                return add;
            });

            filtred && setAddressesFilter(filtred);
        }
    };

    useEffect(() => {
        filter && filterAddresses(filter);
    }, [filter]);

    return (
        <div className="flex flex-col gap-5 grid-cols-4 grid-rows-[auto]">
            {addressesListFilter ? (
                <>
                    {addressesListFilter &&
                        addressesListFilter.map((ad) => (
                            <div
                                className="flex items-center"
                                key={`add-${ad.id}`}
                            >
                                <div className="flex flex-col gap-2 text-sm text-bisyou-font">
                                    {ad.name && (
                                        <h2 className="font-bold">{ad.name}</h2>
                                    )}
                                    <span>
                                        Endereço: {ad.address_line1},{" "}
                                        {ad.street_number} - {ad.address_line2},{" "}
                                        {ad.city} - {ad.state}, {ad.postal_code}
                                    </span>
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <>
                    {addresses &&
                        addresses.map((ad) => (
                            <div className="flex items-center" key={ad.id}>
                                <div className="flex flex-col gap-2 text-sm text-bisyou-font">
                                    {ad.name && (
                                        <h2 className="font-bold">{ad.name}</h2>
                                    )}
                                    <span>
                                        Endereço: {ad.address_line1},{" "}
                                        {ad.street_number} - {ad.address_line2},{" "}
                                        {ad.city} - {ad.state}, {ad.postal_code}
                                    </span>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
}
