import { Shopify } from "@/@types/shopify";
import { moneyFormat } from "@/util/moneyFormat";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

interface CartItemProps {
    product: Shopify.Cart.Item;
}

export function CartItem({ product }: CartItemProps) {
    const price = parseFloat(product.variant.price.amount);

    return (
        <>
            <div className="-w-full px-2 bg-white rounded-lg grid grid-cols-[70px_auto] gap-3 py-2">
                <figure>
                    <Image
                        alt={product.title}
                        src={product.variant.image.url}
                        width={100}
                        height={100}
                        className="rounded-sm"
                    />
                </figure>
                <div className="flex flex-col gap-2">
                    <span className="text-hd-sm/3 font-medium">
                        {product.title}
                    </span>

                    <small className="text-slate-400 text-xs font-medium">
                        {product.variant.title}
                    </small>

                    <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                            {moneyFormat(price)}
                        </span>

                        <div className="flex items-center max-w-[70px]">
                            <Button className="w-5 h-5 p-0 bg-koromiko-500 text-black hover:!text-white">
                                <Minus size={12} strokeWidth={2} />
                            </Button>

                            <input
                                type="text"
                                className="border-none outline-none w-7 h-full text-center"
                                defaultValue={product.quantity}
                                readOnly
                            />

                            <Button className="w-5 h-5 p-0 bg-koromiko-500 text-black hover:!text-white">
                                <Plus size={12} strokeWidth={2} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
