import { ProductSlide } from "./Slide";
import { Product } from "@/@types/ProductObject";
import { ProductDetails } from "./Details";

interface ProductSummaryProps {
    product: Product;
}

export function ProductSummary({ product }: ProductSummaryProps) {
    const prices = {
        price: parseFloat(product.priceRange.maxVariantPrice.amount),
        discount: parseFloat(
            product.compareAtPriceRange.maxVariantPrice.amount
        ),
    };
    return (
        <>
            <div className="w-full px-4 my-20">
                <div className="w-full max-w-bisyouContainer mx-auto grid grid-cols-1 xl:grid-cols-2 gap-2">
                    <div>
                        <ProductSlide images={product.images} prices={prices} />
                    </div>
                    <div>
                        <ProductDetails product={product} />
                    </div>
                </div>
            </div>
        </>
    );
}
