import { CollectionEdge, SimpleNode } from "./CollectionInProduct"
import { Product } from "./ProductObject"
import { BlogObject } from "./shopify/BlogObject"
import { CartData, CartItem } from "./shopify/CartObject"
import { CollectionEdge as SimpleCollectionEdge } from "./shopify/SimpleCollections"
import { CheckoutData, LineItemNode } from "./shopify/Checkout"
import {
  CollectionObjectEdge,
  CollectionSingleObject,
} from "./shopify/Collections"
import { CollectionsByMetafieldsObject } from "./shopify/CollectionsByMetafield"
import { Errors } from "./shopify/Erros"
import { MetaObjectFetch, MetaobjectsEdges } from "./shopify/MetaObjects"
import { ProductByTerm } from "./shopify/ProductByTerm"
import {
  AllProductCategory,
  ProductCategoryEdge,
} from "./shopify/ProductCategory"
import { CartGet } from "./shopify/cart/get"
import { CheckoutCreateData } from "./shopify/cart/create"
import { MenuListData } from "./shopify/MenuList"

export namespace Shopify {
  export namespace MetaObjects {
    export interface MetaObjectData extends MetaObjectFetch {}
    export interface MetaObjectEdge extends MetaobjectsEdges {}
  }

  export interface Articles extends BlogObject {}

  export interface Products extends Product {}
  export interface SimpleProduct extends SimpleNode {}

  export interface Search {
    data: {
      products: {
        edges: {
          node: Product
        }[]
      }
      pages: {
        edges: {
          node: {
            id: string
            title: string
            handle: string
            bodySummary: string
            body: string
          }[]
        }
      }
    }
  }

  export namespace Menu {
    export interface MenuList extends MenuListData {}
    export interface Item {
      id: string
      tags: string[]
      title: string
      type: string
      url: string
      items: Item[]
    }
  }

  export namespace Cart {
    export interface Data extends CartGet {
      errors?: any
    }
    export interface Create {
      data: CheckoutCreateData
    }
    export interface Item extends LineItemNode {}
    export interface Checkout extends CheckoutData {}
    export interface CheckoutRemove {
      data: {
        checkoutLineItemsRemove: {
          checkout: {
            id: string
          }
        }
      } | null
    }
    export interface CheckoutUpdate {
      data: {
        checkoutLineItemsUpdate: {
          checkout: {
            id: string
          }
        }
      } | null
    }
  }

  export interface ProductsByTerm extends ProductByTerm {}

  export interface Error extends Errors {}

  export interface CollectionSinge extends CollectionSingleObject {}
  export interface CollectionsMetafield extends CollectionsByMetafieldsObject {}

  export interface ProductCategoryData extends ProductCategoryEdge {}
  export interface ProductCategory extends AllProductCategory {}

  export interface Collection extends SimpleCollectionEdge {}

  export interface QueryProducts {}
}
