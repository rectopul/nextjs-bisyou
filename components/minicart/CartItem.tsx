import { Shopify } from "@/@types/shopify"
import { moneyFormat } from "@/util/moneyFormat"
import Image from "next/image"
import { Button } from "../ui/button"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/providers/Cart"
import React, { useState } from "react"
import { Spinner } from "../Spinner"
import { DynamicSpinner } from "../DotLoader"
import { toast } from "sonner"

interface CartItemProps {
  product: Shopify.Cart.Item
}

export function CartItem({ product }: CartItemProps) {
  const price = parseFloat(product.variant.price.amount)
  const { removeToCart, updateItem } = useCart()
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const { id: variantId } = product

  const handleRemoveProduct = async () => {
    try {
      setIsLoad(true)
      await removeToCart(variantId)
    } catch (error) {
      return toast.error(`Erro`, {
        description: `Erro ao modificar carrinho`,
      })
    } finally {
      setIsLoad(false)
    }
  }

  const handlePlus = async () => {
    try {
      setIsLoad(true)
      const quantity = ++product.quantity
      await updateItem({
        quantity,
        id: variantId,
        variantId: product.variant.id,
      })
    } catch (error) {
      return toast.error(`Erro`, {
        description: `Erro ao modificar carrinho`,
      })
    } finally {
      setIsLoad(false)
    }
  }

  const handleMinus = async () => {
    try {
      setIsLoad(true)
      if (product.quantity === 1) {
        return setIsLoad(false)
      }

      const quantity = --product.quantity

      await updateItem({
        quantity,
        id: variantId,
        variantId: product.variant.id,
      })
    } catch (error) {
      return toast.error(`Erro`, {
        description: `Erro ao modificar carrinho`,
      })
    } finally {
      setIsLoad(false)
    }
  }

  return (
    <>
      <div className="-w-full px-2 bg-white rounded-lg grid grid-cols-[70px_auto] gap-3 py-2 relative">
        <button
          onClick={handleRemoveProduct}
          className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-700/95 text-white flex justify-center items-center absolute right-2 top-1"
        >
          {isLoad ? (
            <DynamicSpinner size={3} />
          ) : (
            <X size={14} strokeWidth={3} />
          )}
        </button>
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
          <span className="text-hd-sm/3 font-medium">{product.title}</span>

          <small className="text-slate-400 text-xs font-medium">
            {product.variant.title}
          </small>

          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">{moneyFormat(price)}</span>

            <div className="flex items-center max-w-[70px]">
              <Button
                onClick={handleMinus}
                className="w-5 h-5 p-0 bg-koromiko-500 text-black hover:!text-white"
                disabled={product.quantity === 1}
              >
                {isLoad ? (
                  <DynamicSpinner size={3} />
                ) : (
                  <Minus size={12} strokeWidth={2} />
                )}
              </Button>

              <input
                type="text"
                className="border-none outline-none w-7 h-full text-center"
                value={product.quantity}
                readOnly
              />

              <Button
                onClick={handlePlus}
                className="w-5 h-5 p-0 bg-koromiko-500 text-black hover:!text-white"
              >
                {isLoad ? (
                  <DynamicSpinner size={3} />
                ) : (
                  <Plus size={12} strokeWidth={2} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
