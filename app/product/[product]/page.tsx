import { Header } from "@/components/Header";
import { Collection } from "@/components/collection/Collection";
import { Avaliation } from "@/components/product/Avaliation";
import { ImageTool } from "@/components/product/ImageTool";
import { ProductProperties } from "@/components/product/Properties";
import { SlideImages } from "@/components/product/SlideImages";
import { ProductSummary } from "@/components/product/Sumary";
import { QuickView } from "@/components/quickview";
import prisma from "@/lib/client";
import QuicViewProvider from "@/providers/QuickView";
import { getProductShopify, getProductsInCollection } from "@/shopify";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductPageProps {
    params: { product: string };
}

const getData = cache(async (handle: string) => {
    const products = await getProductsInCollection();
    const product = await getProductShopify(handle);

    return { product, products };
});

export default async function Product({ params }: ProductPageProps) {
    const { product } = await getData(params.product);
    const imageSlide = await prisma.imagesSlideDefault.findMany();
    const hasCross = product
        ? product.collections.edges.filter(
              (c) => c.node.handle === "bisyou-momentobisyou"
          )[0]
        : null;

    if (!product) return notFound();

    return (
        <>
            <Header />
            <ProductSummary product={product} />
            <QuicViewProvider>
                <ProductProperties product={product} />
                {product.comparator && (
                    <ImageTool comparator={product.comparator} />
                )}
                <Avaliation />
                <SlideImages images={imageSlide} />
                {hasCross && <Collection collection={hasCross.node} />}
                <QuickView />
            </QuicViewProvider>
        </>
    );
}
