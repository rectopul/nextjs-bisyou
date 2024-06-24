import { AddressesList } from "@/components/panel/pages/find/AddressesList";
import {
    FiltersAddressType,
    FindFilters,
} from "@/components/panel/pages/find/Filters";
import { FindBairro } from "@/components/panel/pages/find/FindBairro";
import { FindContainer } from "@/components/panel/pages/find/FindContainer";
import prisma from "@/lib/client";
import { SlidersHorizontal } from "lucide-react";

const getData = async () => {
    try {
        const cities = await prisma.shopLocations.findMany({
            select: {
                city: true,
            },
        });

        const states = await prisma.shopLocations.findMany({
            select: {
                state: true,
            },
        });

        const bairros = await prisma.shopLocations.findMany({
            select: {
                address_line2: true,
            },
        });

        const addresses = await prisma.shopLocations.findMany();

        return { cities, states, addresses, bairros };
    } catch (error) {
        console.log(error);
    }
};

export default async function FingPage() {
    const data = await getData();

    return (
        <>
            <div className="w-full px-4 my-16">
                <div className="max-w-bisyouContainer flex md:gap-8 gap-5 mx-auto">
                    {data && (
                        <FindContainer
                            addresses={data.addresses}
                            cities={data.cities}
                            states={data.states}
                            bairros={data.bairros}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
