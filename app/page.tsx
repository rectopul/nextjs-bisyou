import { About } from "@/components/About";
import { BlogArticlesCarousel } from "@/components/BlogArticlesCarousel";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { MiniBanner } from "@/components/MiniBanner";
import { FeaturedProductWithMedia } from "@/components/ProductWithMedia";
import { Collection } from "@/components/collection/Collection";
import { FullBanners } from "@/components/home/FullBanners";
import { Avaliation } from "@/components/product/Avaliation";
import { FeaturedModel2 } from "@/components/product/FeaturedModel2";
import { QuickView } from "@/components/quickview";
import { ListRullerOptions } from "@/components/rullerOptions/List";
import { SectionPartners } from "@/components/sections/Partners";
import { ShopCollections } from "@/components/shopCollections/List";
import prisma from "@/lib/client";
import QuicViewProvider from "@/providers/QuickView";
import {
    getBlogArticles,
    getCollection,
    getCollections,
    getProductWithMediaShopify,
} from "@/shopify";
import { Suspense } from "react";

const fetchData = async () => {
    try {
        const fullBanners = await prisma.banners.findMany({
            include: { image: { include: { thumbnail: true } } },
        });

        const rullerOptions = await prisma.rullerOptions.findMany();

        const collections = await getCollections(5);

        const collectionMoreSell = await getCollection("bisyou-momentobisyou");

        const miniBanner = await prisma.miniBanners.findFirst({
            include: { image: true },
        });

        const settings = await prisma.settings.findFirst();

        const partners = await prisma.partners.findMany();

        const blogArticles = await getBlogArticles();

        let productWithMedia = null;
        let featuredKit = null;

        if (settings && settings.product_video) {
            productWithMedia = await getProductWithMediaShopify(
                settings.product_video
            );

            featuredKit = await getProductWithMediaShopify(
                settings.product_video
            );
        }

        return {
            fullBanners,
            rullerOptions,
            collections,
            collectionMoreSell,
            productWithMedia,
            featuredKit,
            miniBanner,
            settings,
            blogArticles,
            partners,
        };
    } catch (error) {
        throw error;
    }
};

export default async function Home() {
    const {
        fullBanners,
        rullerOptions,
        collections,
        collectionMoreSell,
        productWithMedia,
        featuredKit,
        miniBanner,
        settings,
        blogArticles,
        partners,
    } = await fetchData();

    if (!collectionMoreSell) {
        return <h1>Erro de servidor</h1>;
    }

    function Loading() {
        return (
            <>
                <div>Loading...</div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="flex min-h-screen w-full flex-col items-center">
                {fullBanners && <FullBanners banners={fullBanners} />}
                <ListRullerOptions ruller_options={rullerOptions} />
                {collections && <ShopCollections collections={collections} />}

                <Suspense fallback={<Loading />}>
                    <QuicViewProvider>
                        {collectionMoreSell &&
                            collectionMoreSell.data.collection && (
                                <Collection
                                    collection={
                                        collectionMoreSell.data.collection
                                    }
                                    transparent={true}
                                    center={true}
                                />
                            )}
                        <QuickView />
                    </QuicViewProvider>
                </Suspense>
                {productWithMedia && (
                    <FeaturedProductWithMedia product={productWithMedia} />
                )}

                {featuredKit && (
                    <FeaturedModel2
                        product={featuredKit}
                        title="Seu skin care reinventado"
                    />
                )}

                {miniBanner && <MiniBanner miniBanner={miniBanner} />}

                <Avaliation hasInsert={false} />

                {settings && <About settings={settings} />}
                {blogArticles && (
                    <BlogArticlesCarousel blogObject={blogArticles} />
                )}

                {settings && partners && (
                    <SectionPartners partners={partners} settings={settings} />
                )}
            </main>
            <Footer />
        </>
    );
}
