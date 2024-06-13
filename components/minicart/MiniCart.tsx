"use client";

import { useCart } from "@/providers/Cart";
import { moneyFormat } from "@/util/moneyFormat";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { CartItem } from "./CartItem";
import { motion } from "framer-motion";
import { ButtonClose } from "./ButtonClose";

export function MiniCart() {
    const { cart, closeCart, state } = useCart();

    const variants = {
        visible: { x: 0 },
        hidden: { x: 395 },
    };

    console.log(`cart object: `, cart);

    const subtotal =
        (cart &&
            cart.data &&
            cart.data.node &&
            parseFloat(cart.data.node.subtotalPrice.amount)) ||
        0;

    const duties =
        (cart &&
            cart.data &&
            cart.data.node &&
            cart.data.node.totalDuties &&
            parseFloat(cart.data.node.totalDuties.amount)) ||
        0;

    const total =
        (cart &&
            cart.data &&
            cart.data.node &&
            parseFloat(cart.data.node.totalPrice.amount)) ||
        0;

    const tax =
        (cart &&
            cart.data &&
            cart.data.node &&
            parseFloat(cart.data.node.totalTax.amount) + duties) ||
        0;

    return (
        <>
            <motion.div
                data-open={state}
                animate={state ? "visible" : "hidden"}
                variants={variants}
                transition={{
                    duration: 0.2,
                }}
                initial="hidden"
                className="w-full font-poppins z-30 py-3 max-w-[385px] bg-gradient-to-b from-alto-200 to-white fixed right-0 top-0 h-full flex flex-col gap-5"
            >
                <section className="flex px-6 relative justify-centern items-center font-medium text-black">
                    <ButtonClose size={25} strokeWidth={3} />

                    <span className="text-hd-2 mx-auto">Meu carrinho</span>
                </section>

                <section className="flex flex-col gap-3 px-6 w-full">
                    {cart &&
                    cart.data &&
                    cart.data.node &&
                    cart.data.node.lineItems.edges.length > 0 ? (
                        cart &&
                        cart.data.node.lineItems.edges.map((i) => (
                            <CartItem
                                product={i.node}
                                key={`mn-i-${i.node.id}`}
                            />
                        ))
                    ) : (
                        <>
                            <h2 className="text-black font-medium mx-auto text-center my-4">
                                Seu carrinho está vazio
                            </h2>
                        </>
                    )}
                </section>

                <section className="w-full flex px-6 flex-col gap-4 bg-white py-5 rounded-t-3xl mt-auto font-poppins">
                    <div className="text-hd-5 text-slate-400 flex items-center justify-between">
                        <span>Subtotal</span>
                        <span className="font-medium font-poppins text-black">
                            {moneyFormat(subtotal)}
                        </span>
                    </div>

                    <div className="text-hd-5 text-slate-400 flex items-center border-b pb-3 border-dotted border-slate-400 justify-between">
                        <span>Entrega e taxas</span>
                        <span className="font-medium font-poppins text-black">
                            {moneyFormat(tax)}
                        </span>
                    </div>

                    <div className="text-hd-5 text-slate-400 flex items-center justify-between">
                        <span>Total</span>
                        <span className="font-medium font-poppins text-black">
                            {moneyFormat(total)}
                        </span>
                    </div>

                    <Button className="text-black bg-koromiko-400 hover:bg-koromiko-600">
                        Finalizar
                    </Button>
                </section>
            </motion.div>
        </>
    );
}
