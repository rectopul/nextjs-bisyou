import { Button } from "../ui/button";
import { SearchIcon } from "../icons/Icons";
import { ShoppingBag } from "lucide-react";

export function Cart() {
    return (
        <Button className="bg-transparent text-bisyou-font hover:text-bisyou-green hover:bg-transparent">
            <ShoppingBag size={25} />
        </Button>
    );
}
