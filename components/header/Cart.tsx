import { Button } from "../ui/button"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/providers/Cart"

export function Cart() {
  const { openCart } = useCart()
  return (
    <Button
      className="bg-transparent max-md:p-0 text-bisyou-font hover:text-bisyou-green hover:bg-transparent"
      onClick={openCart}
    >
      <ShoppingBag size={25} />
    </Button>
  )
}
