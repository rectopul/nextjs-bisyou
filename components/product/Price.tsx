import { Product } from "@/@types/ProductObject";
import { moneyFormat } from "@/util/moneyFormat";
import { Quantity } from "./Quantity";

interface ProductPriceProps {
    product: Product;
    style?: string;
}

export function ProductPrice({ product, style = "full" }: ProductPriceProps) {
    const price = parseFloat(product.priceRange.maxVariantPrice.amount);
    const promotion = parseFloat(
        product.compareAtPriceRange.maxVariantPrice.amount
    );

    return (
        <>
            <div className="w-full text-bisyou-font font-semibold text-[20px]">
                {price > 0 ? (
                    <>
                        {moneyFormat(price)}{" "}
                        <span className="font-normal">
                            ou 2X {moneyFormat(price / 2)}
                        </span>
                    </>
                ) : (
                    <>
                        {moneyFormat(promotion)}{" "}
                        <span className="font-normal">
                            ou 2X {moneyFormat(promotion / 2)}
                        </span>
                    </>
                )}
            </div>

            <Quantity product={product} style={style} />
        </>
    );
}
