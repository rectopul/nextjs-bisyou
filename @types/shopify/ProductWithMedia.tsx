import { ProductWidthMedia } from "@/shopify"
import { Seo, Variants } from "../ProductObject"

export interface DataProductWithMedia {
  data: Data
}

export interface Data {
  product: ProductWidthMedia
}

export interface ProductWithMediaVariant {
  price: {
    amount: string
  }
  compareAtPrice: {
    amount: string
  }
  selectedOptions: {
    name: string
    value: string
  }[]
  sku: string
  id: string
  availableForSale: boolean
  title: string
  image: {
    altText: string | null
    id: string
    url: string
    height: number
    width: number
    thumbnail: string
  }
}

export interface CompareAtPriceRange {
  maxVariantPrice: MaxVariantPrice
}

export interface MaxVariantPrice {
  amount: string
}

export interface FeaturedImage {
  altText: any
  height: number
  id: string
  url: string
  thumbnail: string
  width: number
}

export interface Images {
  edges: Edge[]
}

export interface Edge {
  node: Node
}

export interface Node {
  altText: any
  height: number
  id: string
  url: string
  thumbnail: string
  width: number
}

export interface Media {
  edges: Edge2[]
}

export interface Edge2 {
  node: ProductMedia
}

export interface ProductMedia {
  id?: string
  alt?: string
  embedUrl?: string
  originUrl?: string
  host?: string
  previewImage?: PreviewImage
}

export interface PreviewImage {
  altText: any
  id: string
  width: number
  url: string
  thumbnail: string
}
