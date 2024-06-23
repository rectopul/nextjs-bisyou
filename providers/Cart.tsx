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
    cart: Shopify.Cart.Data | null;
    addToCart: (data: LineItemAddToCart) => void;
    checkoutId: string | null;
    state: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const defaultContextData: ContextData = {
    cart: null,
    checkoutId: null,
    addToCart: () => {},
    state: false,
    openCart: () => {},
    closeCart: () => {},
};

type CartProviderProps = {
    children: ReactNode;
};

const context = createContext<ContextData>(defaultContextData);

export default function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<Shopify.Cart.Data | null>(null);
    const [checkoutId, setCartId] = useState<string | null>(null);
    const [state, setState] = useState<boolean>(false);

    const handleGetCheckoutId = async () => {
        try {
            const storedCheckoutId = localStorage.getItem("checkoutId");
            if (storedCheckoutId) {
                setCartId(storedCheckoutId);
            } else {
                const checkout = await createCart();
                if (checkout && checkout.data) {
                    const newCheckoutId =
                        checkout.data.checkoutCreate.checkout.id;
                    setCartId(newCheckoutId);
                    localStorage.setItem("checkoutId", newCheckoutId);
                }
            }
        } catch (error) {
            console.error("Erro ao gerênciar carrinho:", error);
        }
    };

    const cartStart = async () => {
        try {
            if (checkoutId) {
                const cartData = await getCart(checkoutId);
                if (!cartData || !cartData.node) {
                    throw new Error("Falha ao obter dados do carrinho.");
                }
                setCart(cartData);
            }
        } catch (error) {
            console.log(`erro ao iniciar carrinho`, error);
        }
    };

    const closeCart = () => setState(false);
    const openCart = () => setState(true);

    const insertToCart = async (data: LineItemAddToCart) => {
        try {
            if (!checkoutId) {
                console.error("checkoutId não está definido.");
                return;
            }

            // Adiciona o item ao carrinho
            const itemAdded = await addToCart(checkoutId, [data]);

            if (!itemAdded || !itemAdded.data) {
                console.error("Falha ao adicionar item ao carrinho.");
                return;
            }

            // Obtém os dados atualizados do carrinho
            const updatedCartId =
                itemAdded.data.checkoutLineItemsAdd.checkout.id;

            console.log(`check id:`, checkoutId);
            console.log(`added id:`, updatedCartId);
            const cartData = await getCart(updatedCartId);

            if (cartData && cartData.node) {
                setCart(cartData);
                openCart();
            } else {
                console.error(
                    "Falha ao obter dados atualizados do carrinho após adição de item."
                );
            }
        } catch (error) {
            console.error("Erro ao inserir item no carrinho:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (checkoutId) {
            cartStart();
        }
    }, [checkoutId]);

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
