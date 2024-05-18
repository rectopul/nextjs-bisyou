import { Products } from "@/@types/ProductsCollection";
import { Header } from "@/components/Header";
import { Avaliation } from "@/components/product/Avaliation";
import { ImageTool } from "@/components/product/ImageTool";
import { ProductProperties } from "@/components/product/Properties";
import { ProductsRecomended } from "@/components/product/Recomended";
import { ProductSummary } from "@/components/product/Sumary";
import { getProductShopify, getProductsInCollection } from "@/shopify";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

async function getData() {
    const products = await getProductsInCollection();
    const product = await getProductShopify("produto-para-teste");
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return { product, products };
}

export default async function Home() {
    const { products, product } = await getData();
    return (
        <main>
            <Header />
            <ProductSummary product={product} />
            <ProductProperties product={product} />
            <ImageTool comparator={product.comparator} />
            <Avaliation />
        </main>
    );
}
