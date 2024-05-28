"use client";

import React, { useState, useEffect } from "react";

interface WindowSize {
    width: number;
    height: number;
}

function useWindowSize(): WindowSize {
    const isClient = typeof window === "object";
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerWidth : 0,
    });

    useEffect(() => {
        if (!isClient) {
            return; // Se não estiver no navegador, não faz nada
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isClient]);

    return windowSize;
}

export default useWindowSize;
