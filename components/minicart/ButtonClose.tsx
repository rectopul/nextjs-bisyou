"use client";

import { MotionProps, motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCart } from "@/providers/Cart";

const Path = (props: MotionProps) => <motion.path {...props} />;

interface ButtonCloseAnimateProps {
    size: number;
    strokeWidth: number;
}

export function ButtonClose({
    size = 20,
    strokeWidth = 2,
}: ButtonCloseAnimateProps) {
    const { closeCart } = useCart();
    const [onHov, setOnHov] = useState<boolean>(false);

    const handleHover = () => {
        setOnHov((prev) => !prev);
    };

    return (
        <>
            <Button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 p-0 bg-transparent text-black hover:bg-red-500 hover:text-white"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                onClick={closeCart}
            >
                <svg
                    viewBox="0 0 24 24"
                    width={size}
                    height={size}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    strokeWidth={strokeWidth}
                >
                    <Path
                        variants={{
                            in: { d: "M18 6L6 18" },
                            hov: { d: "M15 18L9 12L15 6" },
                        }}
                        initial={false}
                        animate={onHov ? "in" : "hov"}
                        transition={{
                            duration: 0.5,
                        }}
                    />
                    <Path
                        variants={{
                            in: { d: "M6 6L18 18" },
                            hov: { opacity: 0 },
                        }}
                        animate={onHov ? "in" : "hov"}
                        transition={{
                            duration: 0.5,
                        }}
                    />
                </svg>
            </Button>
        </>
    );
}
