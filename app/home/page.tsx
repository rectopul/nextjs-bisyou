import { Header } from "@/components/Header";
import { Avaliation } from "@/components/product/Avaliation";
import { ImageTool } from "@/components/product/ImageTool";
import { ProductProperties } from "@/components/product/Properties";
import { ProductSummary } from "@/components/product/Sumary";
import { getProductShopify, getProductsInCollection } from "@/shopify";
import { notFound } from "next/navigation";

async function getData() {
    const products = await getProductsInCollection();
    const product = await getProductShopify("vitamina-c-bisyou");
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return { product, products };
}

export default async function Home() {
    const { products, product } = await getData();

    if (!product) return notFound();

    return (
        <main>
            <Header />
            <ProductSummary product={product} />
            <ProductProperties product={product} />
            {product.comparator && (
                <ImageTool comparator={product.comparator} />
            )}
            <Avaliation />
        </main>
    );
}
