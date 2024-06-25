"use client"
import { Product } from "@/@types/ProductObject"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ProductsRecomended } from "./Recomended"

interface ProductPropertiesProps {
  product: Product
}

interface MetaTypes {
  name: string
  fields: FieldsTypes[]
}

interface FieldsTypes {
  children?: ChildrenFieldsProps[]
  value?: string
  type: "list-item" | "text"
}

interface ChildrenFieldsProps {
  type: string
  value: string
}

export function ProductProperties({ product }: ProductPropertiesProps) {
  const fields: MetaTypes[] = !product.metafield
    ? []
    : product.metafield.references.edges.map((el) => {
        const field = JSON.parse(el.node.fields[0].value)
        return {
          name: el.node.fields[1].value,
          fields: field.children[0].children,
        }
      })

  return (
    <>
      <div className="w-full px-4">
        <div className="max-w-bisyouContainer mx-auto w-full grid grid-cols-1 max-lg:mb-10 xl:grid-cols-2 gap-10">
          {product.collections && product.collections.edges.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-bisyou-font text-2xl font-bold mb-4">
                Produtos Similares
              </h2>

              <div>
                <ProductsRecomended collection={product.collections} />
              </div>
            </div>
          )}
          <div>
            {product.metafield && (
              <Accordion type="multiple">
                {fields.map((ac, k) => (
                  <AccordionItem
                    value={`ac-${k}-${ac.fields[0].type}`}
                    key={`accordeon-${k}`}
                  >
                    <AccordionTrigger className="text-bisyou-font font-medium text-lg">
                      {ac.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      {ac.fields.map((c, k) => (
                        <div key={`ac-item-${k}`}>
                          {c.children ? (
                            <ul key={`ac-children-${k}`}>
                              {c.children.map((c) => (
                                <li key={`ec-children-nv-2-${k}`}>{c.value}</li>
                              ))}
                            </ul>
                          ) : (
                            <span className="whitespace-pre-line">
                              {c.value && c.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
