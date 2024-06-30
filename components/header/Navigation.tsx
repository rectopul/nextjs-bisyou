import { Shopify } from "@/@types/shopify"

interface NavigationMenuProps {
  menu: Shopify.Menu.MenuList
}

export async function NavigationMenu({ menu }: NavigationMenuProps) {
  return (
    <>
      <ul className="hidden xl:flex justify-between gap-10 font-normal font-fabriga text-[14px]">
        {menu.data.menu.items.map((m) => (
          <li key={m.id}>
            <a href={m.url} className="hover:underline text-bisyou-font">
              {m.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
