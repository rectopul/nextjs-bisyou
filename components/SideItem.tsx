"use client"

import { usePathname } from "next/navigation"
import React from "react"

interface SideItemProps {
  children?: React.ReactNode
  name: string
  link: string
  slug: string
}

export function SideItem({ children, name, link, slug }: SideItemProps) {
  const pathName = usePathname()
  const separatorPath = pathName.split("/")
  const currentPage = separatorPath.at(-1)

  const active = currentPage === slug ? true : false

  return (
    <li>
      <a className={active ? "active" : " "} href={link} aria-current="page">
        <button
          data-active={active}
          className="align-middle select-none font-sans font-bold text-center transition-all text-blue-gray-500 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-white from-gray-900 to-gray-800 data-[active=true]:shadow-md shadow-gray-900/10 hover:bg-blue-gray-500/10 data-[active=true]:bg-gradient-to-tr data-[active=true]:text-white  w-full flex items-center gap-4 px-4 capitalize relative overflow-hidden"
          type="button"
        >
          {children}
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
            {name}
          </p>
        </button>
      </a>
    </li>
  )
}
