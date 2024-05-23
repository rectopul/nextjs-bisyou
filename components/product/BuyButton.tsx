import { Plus, ShoppingBag } from "lucide-react";

interface BuyButtonProps {
    handle: string;
    id: string;
}

export function BuyButton({ handle, id }: BuyButtonProps) {
    return (
        <>
            <div className="w-full flex items-center gap-1">
                <a
                    href={`/product/${handle}`}
                    className="flex-1 text-center flex hover:bg-opacity-80 justify-center items-center rounded-l-full h-[45px] bg-bisyou-green text-white"
                >
                    Conhecer
                </a>
                <button className="w-16 h-[45px] flex hover:bg-opacity-80 justify-center items-center bg-bisyou-greenBlack rounded-r-full text-white">
                    <Plus size={15} className="mr-1" />
                    <ShoppingBag size={16} />
                </button>
            </div>
        </>
    );
}
