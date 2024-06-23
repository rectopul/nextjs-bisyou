"use client";

import { Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/providers/Cart";
import { useQuickView } from "@/providers/QuickView";
import { Shopify } from "@/@types/shopify";
import { useState } from "react";
import { Spinner } from "../Spinner";

interface BuyButtonProps {
    handle: string;
    id: string;
    size?: "spacing" | "default" | "list" | "grid" | false | null;
    hasQuick?: boolean;
    product?: Shopify.Products;
}

export function BuyButton({
    handle,
    id,
    size,
    hasQuick = false,
    product,
}: BuyButtonProps) {
    const { addToCart } = useCart();
    const { open } = useQuickView();
    const [isLoad, setIsLod] = useState<boolean>(false);

    const handleAddToCart = async () => {
        try {
            if (hasQuick && product) {
                return open(product);
            }
            setIsLod(true);

            await addToCart({ quantity: 1, variantId: id });
            return setIsLod(false);
        } catch (error) {
            console.log(error);
            return setIsLod(false);
        }
    };

    return (
        <>
            <div
                data-size={size}
                className="w-full data-[size=small]:max-w-[250px] data-[size=list]:max-w-[250px] md:mt-auto flex items-center gap-1"
            >
                <a
                    href={`/product/${handle}`}
                    data-size={size}
                    className="flex-1 data-[size=grid]:text-xs text-center flex hover:bg-opacity-80 justify-center items-center rounded-l-full h-[45px] max-md:data-[size=grid]:h-9 bg-bisyou-green text-white"
                >
                    Conhecer
                </a>
                <motion.button
                    data-size={size}
                    className="w-16 h-[45px] max-h-full data-[size=grid]:max-md:h-9 overflow-hidden rounded-l-none flex justify-center items-center rounded-r-full text-white bg-bisyou-greenBlack group"
                    onClick={handleAddToCart}
                    initial={{
                        width: "64px",
                        borderRadius: "0 9999px 9999px 0",
                    }}
                    whileHover={{
                        borderRadius: ["9999px"],
                        width: ["64px", "45px"],
                    }}
                >
                    {isLoad ? (
                        <Spinner size="sm" />
                    ) : (
                        <>
                            <Plus size={15} className="mr-1 group-hover:mr-0" />
                            <ShoppingBag
                                size={16}
                                className="group-hover:hidden"
                            />
                        </>
                    )}
                </motion.button>
            </div>
        </>
    );
}
