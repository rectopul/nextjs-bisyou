import { PageSearchFilter } from "@/components/pageSearch/PageSearchFilter"

import { getCollection, getMetaObject, listCategories } from "@/shopify"
import { headers } from "next/headers"
import { cache } from "react"

const fetchData = cache(async () => {
  const products = await getCollection("bisyou-momentobisyou")
  const categories = await listCategories()
  const skinType = await getMetaObject("topo_de_pelle")
  const need = await getMetaObject("necessidade")
  const product_type = await getMetaObject("tipo_de_produto")

  return { products, categories, skinType, need, product_type }
})

export default async function SearchPage() {
  const { products, categories, skinType, need, product_type } =
    await fetchData()

  const header = await headers()

  const viewPort = await header.get("viewport")

  return (
    <div className="w-full px-4 my-16">
      {products &&
        products.data.collection &&
        skinType.length > 0 &&
        need.length > 0 &&
        product_type.length > 0 &&
        viewPort && (
          <PageSearchFilter
            props={[skinType, need, product_type]}
            categories={categories}
            data={products.data}
            viewPort={viewPort}
          />
        )}
    </div>
  )
}
