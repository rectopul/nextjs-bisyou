"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { moneyFormat } from "@/util/moneyFormat";
import { Flag } from "./Flag";
import { Quantity } from "./product/Quantity";
import { useQuickView } from "@/providers/QuickView";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function QuickView() {
    const { product, close, state } = useQuickView();
    const [variantState, setVariantState] = useState<"visible" | "hidden">(
        "hidden"
    );
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (product) {
            setVariantState("visible");
        } else {
            setVariantState("hidden");
        }
    }, [product]);

    const handleClose = () => setVariantState("hidden");

    if (!product) return;

    const variant = {
        visible: { scale: 1, opacity: 1 },
        hidden: { scale: 0, opacity: 0 },
    };

    const price = parseFloat(product.priceRange.maxVariantPrice.amount);
    const compare = parseFloat(
        product.compareAtPriceRange.maxVariantPrice.amount
    );

    return (
        <>
            <motion.div
                ref={ref}
                data-state={state}
                initial={variantState}
                variants={variant}
                transition={{ duration: 0.4 }}
                animate={variantState}
                className="w-full quickview-component max-w-[600px] p-3 z-20 bg-white left-1/2 md:top-1/2 rounded-xl shadow flex gap-5 fixed"
                onAnimationComplete={(definition) => {
                    if (definition == "hidden") close();
                }}
                style={{
                    marginLeft: `-${
                        ref.current ? ref.current.offsetWidth / 2 : 60
                    }px`,
                    marginTop: `-${
                        ref.current ? ref.current.offsetHeight / 2 : 60
                    }px`,
                }}
            >
                <Button
                    variant="destructive"
                    className="absolute right-2 top-2 w-5 h-5 p-1 text-white"
                    onClick={handleClose}
                >
                    <X size={16} strokeWidth={3} />
                </Button>
                <figure>
                    <Image
                        alt={product.handle}
                        src={product.featuredImage.thumbnail}
                        width={400}
                        height={400}
                        className="rounded-l-xl"
                    />
                </figure>

                <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-hd-4 text-black font-medium flex flex-col gap-1 pr-5">
                        {product.title}
                        <span className="text-slate-400 font-medium text-sm">
                            {product.variants.edges[0].node.title}
                        </span>
                    </h3>

                    <div className="text-slate-400 flex items-center gap-1 text-sm">
                        <del>de {moneyFormat(price)}</del>
                        <Flag text="40% OFF" />
                    </div>

                    <div className="text-slate-400 flex items-center gap-1">
                        por{" "}
                        <span className="text-bisyou-green">
                            {moneyFormat(compare)}
                        </span>
                        ou 5x de{" "}
                        <span className="font-medium">
                            {moneyFormat(compare / 5)}
                        </span>
                    </div>

                    <div className="flex flex-col mt-auto">
                        <Quantity product={product} style="min" />
                    </div>
                </div>
            </motion.div>
        </>
    );
}
