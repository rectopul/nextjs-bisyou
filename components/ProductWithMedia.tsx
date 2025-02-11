import { discountCalculator } from "@/util/discountCalculator"
import { moneyFormat } from "@/util/moneyFormat"
import Image from "next/image"
import { BuyButton } from "./product/BuyButton"
import { ProductVideo } from "./product/ProductVideo"
import { ProductWidthMedia } from "@/shopify"

export interface FeaturedProductWithMediaProps {
  product: ProductWidthMedia
}

export function FeaturedProductWithMedia({
  product,
}: FeaturedProductWithMediaProps) {
  const compareAtPrice = parseFloat(
    product.compareAtPriceRange.maxVariantPrice.amount,
  )
  const priceRange = parseFloat(product.priceRange.maxVariantPrice.amount)

  const media = product.media.edges.filter((m) => m.node.host === "YOUTUBE")[0]

  const lastImage =
    product.images && product.images.edges.length > 1
      ? product.images.edges.at(-1)
      : null

  return (
    <>
      <div className="w-full px-4 my-[40px]">
        <div className="w-full max-w-bisyouContainerHome mx-auto flex flex-col xl:flex-row gap-5">
          <div className="flex-1 max-h-[480px] overflow-hidden flex justify-center items-center rounded-xl">
            {media && <ProductVideo media={media.node} />}
          </div>
          <div className="w-full max-w-[310px] max-md:mx-auto flex flex-col rounded-lg">
            <figure className="w-full relative group">
              <Image
                width={product.featuredImage.width}
                height={product.featuredImage.height}
                alt={product.featuredImage.altText || product.handle}
                src={product.featuredImage.thumbnail}
                className="rounded-t-xl"
              />

              <div className="w-full absolute top-0 left-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                {lastImage && (
                  <Image
                    width={300}
                    height={300}
                    src={lastImage.node.thumbnail}
                    className="w-full rounded-t-xl"
                    alt={lastImage.node.altText || product.handle}
                  />
                )}
              </div>
            </figure>

            <div className="flex mt-5 px-4 flex-col gap-3 w-full text-slate-900 font-medium text-sm">
              <span className="text-center font-semibold">{product.title}</span>

              <span className="text-slate-400 flex justify-center items-center">
                {moneyFormat(compareAtPrice)}
                <span className="px-3 py-1 ml-2 rounded-full bg-red-600 text-white text-xs">
                  -{discountCalculator(compareAtPrice, priceRange)}% OFF
                </span>
              </span>

              <div className="text-slate-400 flex justify-center items-center">
                <span className="text-bisyou-green text-[16px] font-semibold mr-1">
                  {moneyFormat(priceRange)}
                </span>
                ou 3X de{" "}
                <span className="ml-1 font-semibold text-slate-600">
                  {moneyFormat(priceRange / 3)}
                </span>
              </div>

              <BuyButton
                product={{ ...product }}
                handle={product.handle}
                id={product.id}
                hasQuick
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
