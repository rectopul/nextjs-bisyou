"use client"

import { useState } from "react"
import { InstantSearchBar } from "../InstantSearch"
import { Cart } from "./Cart"
import { Button } from "../ui/button"
import { SearchIcon } from "../icons/Icons"
import { useCart } from "@/providers/Cart"

export function HeaderActions() {
  const [state, setState] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const { cart } = useCart()

  const handleChangeState = () => {
    setState(() => (showSearch == false ? false : true))
  }
  const handleShow = () => {
    setState(true)
    setShowSearch(!showSearch)
  }

  return (
    <>
      <div className="md:absolute md:right-0 md:top-[50%] md:-translate-y-[50%] flex">
        <Button
          className="bg-transparent text-bisyou-font hover:text-rose-fog-300 hover:bg-transparent max-md:px-2"
          onClick={handleShow}
        >
          <SearchIcon size={25} />
        </Button>
        <div className="relative w-10 group h-10 bg-transparent text-bisyou-font hover:text-rose-fog-300">
          <span className="absolute -top-2 group-hover:bg-rose-fog-300 max-md:right-0 -right-2 text-xs/5 font-bold w-5 h-5 bg-mantis-400 text-mantis-100 rounded-full">
            {cart && cart.node ? cart.node.lineItems.edges.length : 0}
          </span>
          <Cart />
        </div>
      </div>

      {state && (
        <div
          data-visible={showSearch}
          className="absolute max-md:px-4 max-md:fixed max-md:top-4 max-md:left-0 data-[visible=false]:animate-out data-[visible=false]:zoom-out-95 data-[visible=false]:fade-out-0 data-[visible=false]:-slide-out-to-top-96 animate-in data-[visible=true]:fade-in-100 data-[visible=true]:zoom-in-95  data-[visible=true]:slide-in-from-top-1/2 transition-all duration-300 data-[visible=true]:opacity-100 w-full xl:w-[600px] max-w-[600px] px-5 right-[88px] -top-96 data-[visible=true]:top-1/2 max-md:data-[visible=true]:top-24 -mt-5 overflow-hidden rounded-md z-20"
          onAnimationEnd={handleChangeState}
        >
          <div className="w-full shadow-sm">
            <InstantSearchBar onCloseBar={() => setShowSearch(!showSearch)} />
          </div>
        </div>
      )}
    </>
  )
}
