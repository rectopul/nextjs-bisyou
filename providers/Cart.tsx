"use client";

import { Shopify } from "@/@types/shopify";
import { addToCart, createCart, getCart } from "@/shopify";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export interface LineItemAddToCart {
    variantId: string;
    quantity: number;
}

interface ContextData {
    cart: Shopify.Cart.Checkout | null;
    addToCart: (data: LineItemAddToCart) => void;
    checkoutId: string | null;
    state: boolean;
    openCart: () => void;
    closeCart: () => void;
    startCart: () => void;
}

const defaultContextData: ContextData = {
    cart: null,
    checkoutId: null,
    addToCart: () => {},
    state: false,
    openCart: () => {},
    closeCart: () => {},
    startCart: () => {},
};

type AsanaProviderProps = {
    children: ReactNode;
};

const context = createContext<ContextData>(defaultContextData);

export default function CartProvider({ children }: AsanaProviderProps) {
    const [cart, setcart] = useState<Shopify.Cart.Checkout | null>(null);
    const [checkoutId, setCartId] = useState<string | null>(null);
    const [state, setState] = useState<boolean>(false);

    const startCart = async () => {
        const checkout = await createCart();
        if (checkout) {
            setCartId(checkout.data.checkoutCreate.checkout.id);
            const cartData = await getCart(
                checkout.data.checkoutCreate.checkout.id
            );
            cartData && setcart(cartData);
            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "checkoutId",
                    checkout.data.checkoutCreate.checkout.id
                );
            }
        }
    };

    const handleGetCheckoutId = async () => {
        const storedCheckoutId =
            typeof window !== "undefined"
                ? localStorage.getItem("checkoutId")
                : null;

        if (storedCheckoutId && storedCheckoutId !== "") {
            setCartId(storedCheckoutId);

            const cartData = await getCart(storedCheckoutId);
            if (!cartData || !cartData.data) {
                const checkout = await createCart();
                if (checkout) {
                    setCartId(checkout.data.checkoutCreate.checkout.id);
                    const cartData = await getCart(
                        checkout.data.checkoutCreate.checkout.id
                    );
                    cartData && setcart(cartData);
                    if (typeof window !== "undefined") {
                        localStorage.setItem(
                            "checkoutId",
                            checkout.data.checkoutCreate.checkout.id
                        );
                    }
                }
            } else {
                cartData && setcart(cartData);
            }
        } else {
            const checkout = await createCart();

            if (checkout) {
                setCartId(checkout.data.checkoutCreate.checkout.id);
                const cartData = await getCart(
                    checkout.data.checkoutCreate.checkout.id
                );
                cartData && setcart(cartData);
                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        "checkoutId",
                        checkout.data.checkoutCreate.checkout.id
                    );
                }
            }
        }
    };

    const closeCart = () => setState(false);
    const openCart = () => setState(true);

    const insertToCart = async (data: LineItemAddToCart) => {
        try {
            if (!checkoutId) return;

            const cart = await addToCart(checkoutId, [data]);

            cart && setcart(cart);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        handleGetCheckoutId();
    }, []);

    const defaultContextData: ContextData = {
        cart,
        checkoutId,
        addToCart: insertToCart,
        openCart,
        state,
        closeCart,
        startCart,
    };

    return (
        <context.Provider value={defaultContextData}>
            {children}
        </context.Provider>
    );
}

export function useCart() {
    return useContext(context);
}
