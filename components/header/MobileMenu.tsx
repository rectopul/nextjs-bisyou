"use client"

import { Shopify } from "@/@types/shopify"
import { ChevronRight, Menu, X } from "lucide-react"
import { Button } from "../ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"

interface MobileMenuProps {
  menu: Shopify.Menu.MenuList
}

export function MobileMenu({ menu }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        data-open={isOpen}
        className="w-10 h-10 md:hidden px-2 data-[open=false]:scale-100 data-[open=true]:scale-0 transition-all duration-300"
        variant="bisCarousel"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={22} strokeWidth={3} />
      </Button>
      <div
        data-open={isOpen}
        className="md:hidden fixed overflow-hidden data-[open=false]:max-w-0 data-[open=false]:max-h-0 data-[open=true]:max-w-full w-full h-full transition-all duration-500 left-0 top-0 z-50 bg-bisyou-default rounded-lg"
      >
        <div
          data-open={isOpen}
          className="flex overflow-hidden w-[100vw] flex-col w-90% gap-4 transition-all duration-300 data-[open=false]:max-h-0 data-[open=true]:max-h-full"
        >
          <div
            data-open={isOpen}
            className="px-3 pb-3 pt-7 transition-all duration-300 data-[open=false]:max-h-0 data-[open=true]:max-h-full"
          >
            <Button
              data-open={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="absolute left-3 top-2 p-0 rounded-full bg-red-500 text-white w-6 h-6 flex justify-center items-center transition-all duration-300 data-[open=false]:scale-0 data-[open=true]:scale-100"
            >
              <X size={15} />
            </Button>
            <Accordion type="single" collapsible>
              {menu.data.menu.items.map((m) => (
                <AccordionItem
                  value={m.id}
                  key={`hm-lvl1-${m.id}`}
                  className="last:border-none"
                >
                  {m.items.length > 0 ? (
                    <>
                      <AccordionTrigger className="text-sm text-bisyou-font [&>svg]:hidden [&[data-state=open]>span]:rotate-90">
                        <div className="text-sm">{m.title}</div>
                        <span className="bg-white w-5 h-5 transition-all duration-300 text-bisyou-font rounded-full flex items-center justify-center">
                          <ChevronRight size={15} />
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col gap-2 w-full">
                          {m.items.map((i) => (
                            <li className="w-full" key={`lvl-2-${i.id}`}>
                              <a
                                href={i.url}
                                className="w-full flex p-2 rounded-lg hover:bg-bisyou-icon hover:text-white transition-all duration-300"
                              >
                                {i.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </>
                  ) : (
                    <a
                      href={m.url}
                      className="text-sm text-bisyou-font text-left w-full py-3 rounded-lg inline-flex"
                    >
                      {m.title}
                    </a>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
