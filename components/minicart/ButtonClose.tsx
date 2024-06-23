"use client";

import { MotionProps, motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCart } from "@/providers/Cart";
import { X } from "lucide-react";

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
                <X />
            </Button>
        </>
    );
}
