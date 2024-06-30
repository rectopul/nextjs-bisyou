"use client"

import {
  Handshake,
  Home,
  Images,
  ImageUp,
  Menu,
  MessagesSquare,
  Settings,
  SquareStack,
  Store,
} from "lucide-react"
import { SideItem } from "../SideItem"
import { ItemPageSidebar } from "./pages/ItemSideBar"
import Image from "next/image"
import { Settings as SettingsInput } from "@prisma/client"
import { useRef, useState } from "react"
import { ChangeLogo } from "./ChangeLogo"

interface AsideProps {
  name: string
  settings: SettingsInput
}

export function Aside({ name, settings }: AsideProps) {
  const [logo, setLogo] = useState<string | null>(settings.logo)
  const changeLogoRef = useRef<{ openFileDialog: () => void }>(null)

  const handleButtonClick = () => {
    changeLogoRef.current?.openFileDialog()
  }

  return (
    <div className="bg-white shadow-sm -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
      <div className="relative group overflow-hidden">
        <a className="py-6 px-8 text-center" href="#/">
          <button
            onClick={handleButtonClick}
            className="absolute top-1/2 transition-all duration-300 opacity-0 animate-in group-hover:opacity-100 right-5 text-slate-900"
          >
            <ImageUp size={18} strokeWidth={2} />
          </button>
          <ChangeLogo
            settings={settings}
            ref={changeLogoRef}
            onImageChange={(setting) => setLogo(setting.logo)}
          />
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
            {logo ? (
              <Image
                alt={settings.storeSlug}
                width={143}
                height={55}
                src={logo}
                className="w-[50%] mx-auto"
              />
            ) : (
              name
            )}
          </h6>
        </a>
        <button
          className="align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </button>
      </div>

      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <SideItem slug="panel" link="/panel" name="Dashboard">
            <Home size={20} />
          </SideItem>

          <ItemPageSidebar />

          <SideItem link="/panel/shops" slug="shops" name="Lojas">
            <Store size={20} />
          </SideItem>

          <SideItem link="/panel/partners" slug="partners" name="Parceiros">
            <Handshake size={20} />
          </SideItem>

          <SideItem link="/panel/menus" slug="menus" name="Menus">
            <Menu size={20} />
          </SideItem>

          <SideItem
            link="/panel/collections"
            slug="collections"
            name="Coleções"
          >
            <SquareStack size={20} />
          </SideItem>

          <SideItem link="/panel/banners" slug="banners" name="Banners">
            <Images size={20} />
          </SideItem>

          <SideItem link="/panel/config" slug="config" name="Configurações">
            <Settings size={20} />
          </SideItem>
        </ul>
      </div>
    </div>
  )
}
