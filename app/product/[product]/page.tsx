import { Header } from "@/components/Header";
import { Collection } from "@/components/collection/Collection";
import { Avaliation } from "@/components/product/Avaliation";
import { ImageTool } from "@/components/product/ImageTool";
import { ProductProperties } from "@/components/product/Properties";
import { ProductSummary } from "@/components/product/Sumary";
import { getProductShopify, getProductsInCollection } from "@/shopify";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: { product: string };
}

async function getData(handle: string) {
    const products = await getProductsInCollection();
    const product = await getProductShopify(handle);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return { product, products };
}

export default async function Product({ params }: ProductPageProps) {
    const { product } = await getData(params.product);
    const hasCross = product
        ? product.collections.edges.filter(
              (c) => c.node.handle === "compre-tambem"
          )[0]
        : null;

    if (!product) return notFound();

    return (
        <>
            <Header />
            <ProductSummary product={product} />
            <ProductProperties product={product} />
            {product.comparator && (
                <ImageTool comparator={product.comparator} />
            )}
            <Avaliation />
            {hasCross && <Collection collection={hasCross} />}
        </>
    );
}
