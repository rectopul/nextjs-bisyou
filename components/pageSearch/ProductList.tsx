"use client";

import { Shopify } from "@/@types/shopify";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProductItem } from "../product/ProductItem";

export function ProductList({ data }: Shopify.CollectionSinge) {
    const [listType, setListType] = useState<
        "default" | "grid" | "spacing" | "list" | undefined
    >("grid");

    return (
        <>
            <h2 className="w-full flex items-center mb-10 justify-between">
                <div className="text-2xl text-bisyou-font font-medium">
                    {data.collection.title}
                </div>

                <Button
                    variant="bisCarousel"
                    className="w-8 h-8 p-2"
                    onClick={() =>
                        setListType((prev) =>
                            prev === "grid" ? "list" : "grid"
                        )
                    }
                >
                    {listType == "list" ? (
                        <LayoutGrid size={18} />
                    ) : (
                        <LayoutList size={18} />
                    )}
                </Button>
            </h2>
            <motion.div
                layout="preserve-aspect"
                className={`grid gap-5 transition-all duration-500 ${
                    listType === "grid"
                        ? "grid-cols-2 md:grid-cols-3 auto-rows-1"
                        : "grid-cols-1"
                }`}
                transition={{
                    layout: {
                        duration: 0.1,
                    },
                }}
            >
                {data &&
                    data.collection &&
                    data.collection.products.edges.map((p) => (
                        <motion.div
                            layout="preserve-aspect"
                            transition={{
                                layout: {
                                    duration: 0.3,
                                },
                            }}
                            key={p.node.id}
                            data-type={listType}
                            className="flex flex-col data-[type=list]:h-auto rounded-xl min-h-10"
                        >
                            <ProductItem
                                product={{ ...p }}
                                variant={listType}
                            />
                        </motion.div>
                    ))}
            </motion.div>
        </>
    );
}
