import { Shopify } from "../shopify"

export interface MenuListData {
  data: {
    menu: Data
  }
}

export interface Data {
  handle: string
  id: string
  title: string
  items: Shopify.Menu.Item[]
  itemsCount: number
}
