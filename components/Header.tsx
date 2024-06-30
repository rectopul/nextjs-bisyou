import Image from "next/image"
import logo from "../public/assets/img/logo-small_large.webp"
import { HeaderActions } from "./header/Actions"
import { NavigationMenu } from "./header/Navigation"
import { AnnoncementBar } from "./header/AnnoncementBar"
import { MiniCart } from "./minicart/MiniCart"
import prisma from "@/lib/client"
import { getMenu } from "@/shopify"
import { MobileMenu } from "./header/MobileMenu"

export async function Header() {
  const menu = await prisma.menus.findFirst({
    where: { position: "header_menu" },
  })
  const mobileMenu = await prisma.menus.findFirst({
    where: { position: "mobile_menu" },
  })

  if (!menu || !mobileMenu) return

  const shopifyMenu = await getMenu(menu.slug)
  const shopifyMobileMenu = await getMenu(mobileMenu.slug)

  return (
    <>
      <AnnoncementBar />
      <MiniCart />

      <div className="w-full max-w-bisyouContainer mx-auto max-md:px-4 py-6 text-center items-center flex justify-between md:justify-center relative">
        <MobileMenu menu={shopifyMobileMenu} />

        <a
          href="/"
          className="inline-flex max-md:absolute max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2"
        >
          <Image alt="bisyou" src={logo} unoptimized width={150} height={100} />
        </a>

        <HeaderActions />
      </div>

      <div className="w-full mx-auto bg-bisyou-gray">
        <div className="w-full max-w-bisyouContainer mx-auto py-4">
          {menu && <NavigationMenu menu={shopifyMenu} />}
        </div>
      </div>
    </>
  )
}
