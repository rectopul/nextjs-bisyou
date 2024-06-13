"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/icons/Icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useWindowSize from "@/util/useWindowSize";
import { Shopify } from "@/@types/shopify";
import { generateFilter } from "@/util/generateFilters";

type Parametros = "topo_de_pelle" | "necessidade" | "tipo_de_produto";

export interface FilterChangeProps {
    type: string;
    key: string;
    value: string;
}

interface SearchFilterProps {
    props: Shopify.MetaObjects.MetaObjectEdge[][];
    categories: Shopify.ProductCategory[];
    onFilterChange: (data: FilterChangeProps[]) => void;
}

function convertString(input?: string) {
    if (!input) return;
    // Dividir a string pelo caractere de sublinhado "_"
    const words = input.split("_");

    // Capitalizar a primeira letra de cada palavra
    const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Juntar as palavras com espaço
    const result = capitalizedWords.join(" ");

    return result;
}

const filterKeys: Record<Parametros, string> = {
    topo_de_pelle: "tipo_de_pele",
    necessidade: "nescessidades_do_produto",
    tipo_de_produto: "tipo_de_produto",
};

export function SearchFilter({
    categories,
    props,
    onFilterChange,
}: SearchFilterProps) {
    const [show, setShow] = useState<boolean>(false);
    const [isMobile, setIsmobile] = useState<boolean>(false);
    const [filtersTerm, setFiltersTerm] = useState<FilterChangeProps[]>([]);
    const size = useWindowSize().width;

    const filters: string[][] = props
        .map(
            (pr) =>
                pr
                    .map((nm) => {
                        // Supondo que `sk` esteja definido e acessível aqui
                        const value = nm.node.fields[0].value;
                        return value;
                    })
                    .at(-1) || "{}"
        )
        .map((item) => JSON.parse(item));

    useEffect(() => {
        setIsmobile(size < 767 ? true : false);
    }, [size]);

    useEffect(() => {
        if (filtersTerm.length > 0) {
            onFilterChange(filtersTerm);
        }
    }, [filtersTerm]);

    const variants = {
        hidden: { x: -180 },
        visible: { x: 0 },
    };

    const handleSelect = (type: string, key: string, value: string) => {
        const typeIndex = type as Parametros;
        if (filterKeys[typeIndex]) {
            const filtredQuery = filtersTerm.filter(
                (e) => e.type !== filterKeys[typeIndex]
            );
            setFiltersTerm((prev) => [
                { type: filterKeys[typeIndex], key, value },
                ...filtredQuery,
            ]);
        }
    };

    return (
        <>
            <Button
                variant="bisCarousel"
                className="font-bold md:hidden absolute right-10 top-0 w-8 h-8 p-2"
                onClick={() => setShow(!show)}
            >
                <Filter size={23} strokeWidth={6} />
            </Button>

            <motion.div
                className="flex flex-col bg-white max-md:rounded-md gap-5 z-20 max-md:-translate-x-full absolute md:relative top-0 -left-3 max-md:p-3 max-md:shadow"
                variants={variants}
                initial={isMobile ? "hidden" : "visible"}
                transition={{ duration: 0.1 }}
                animate={
                    isMobile && show
                        ? "visible"
                        : isMobile
                        ? "hidden"
                        : "visible"
                }
            >
                <div className="w-full flex justify-between text-bisyou-icon items-center">
                    <h2 className="text-2xl">Filtrar por</h2>

                    <span className="font-bold">
                        <Filter size={23} strokeWidth={6} />
                    </span>
                </div>
                {filters.map((ft, k) => (
                    <div className="w-full flex flex-col" key={`filter-${k}`}>
                        <div className="w-full">
                            <Select
                                onValueChange={(value) => {
                                    const lastElement = props[k]?.at(-1);
                                    const node = lastElement?.node;
                                    const type = node?.type;
                                    const key = node?.fields?.[0]?.key;

                                    if (type && key) {
                                        handleSelect(type, key, value);
                                    }
                                }}
                            >
                                <SelectTrigger className="focus:ring-0 focus:ring-offset-2 ring-offset-bisyou-icon w-full h-9 bg-bisyou-yellow text-[16px] text-bisyou-icon border-0 font-medium rounded-full px-5">
                                    <SelectValue
                                        placeholder={convertString(
                                            props[k].at(-1)?.node.type
                                        )}
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {ft.map((sk, k) => (
                                        <SelectItem
                                            value={sk}
                                            key={`${sk}-${k}`}
                                        >
                                            {sk}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ))}

                <ul className="w-full text-sm flex flex-col gap-2 pl-6 font-medium">
                    <li className="text-bisyou-icon text-lg data-[active=true]:font-bold hover:underline">
                        Categorias:
                    </li>
                    {categories.map((c, k) => (
                        <li key={c.category.id}>
                            <a
                                href={`/busca?category=${c.category.name}`}
                                className="text-bisyou-icon data-[active=true]:font-bold hover:underline"
                            >
                                {c.category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </>
    );
}
