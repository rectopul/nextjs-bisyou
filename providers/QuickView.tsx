"use client";

import { Shopify } from "@/@types/shopify";
import { ReactNode, createContext, useContext, useState } from "react";

export interface LineItemAddToCart {
    variantId: string;
    quantity: number;
}

interface ContextData {
    product: Shopify.Products | null;
    state: boolean;
    open: (prod: Shopify.Products) => void;
    close: () => void;
}

const defaultContextData: ContextData = {
    product: null,
    state: false,
    open: () => {},
    close: () => {},
};

type AquickProviderProps = {
    children: ReactNode;
};

const context = createContext<ContextData>(defaultContextData);

export default function QuicViewProvider({ children }: AquickProviderProps) {
    const [product, setProduct] = useState<Shopify.Products | null>(null);
    const [state, setState] = useState<boolean>(false);

    const close = async () => {
        await setState(false);
        await setProduct(null);
    };

    const open = async (prod: Shopify.Products) => {
        prod && (await setState(true));
        await setProduct(prod);
    };

    const defaultContextData: ContextData = {
        product,
        open,
        state,
        close,
    };

    return (
        <context.Provider value={defaultContextData}>
            {children}
        </context.Provider>
    );
}

export function useQuickView() {
    return useContext(context);
}
