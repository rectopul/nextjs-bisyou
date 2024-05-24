import { CollectionEdge, ProductNode } from "@/@types/CollectionInProduct";
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
import { ListRullerOptions } from "@/components/rullerOptions/List";
import { SectionPartners } from "@/components/sections/Partners";
import { ShopCollections } from "@/components/shopCollections/List";
import prisma from "@/lib/client";
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

        const collectionMoreSell = await getCollection("compre-tambem");

        const productWithMedia = await getProductWithMediaShopify(
            "clareador-de-tons-irregulares"
        );

        const featuredKit = await getProductWithMediaShopify(
            "kit-bio-estimulador-de-firmeza-hidratante-acqua-360-vitamina-c-preenchedor"
        );

        const miniBanner = await prisma.miniBanners.findFirst({
            include: { image: true },
        });

        const settings = await prisma.settings.findFirst();

        const partners = await prisma.partners.findMany();

        const blogArticles = await getBlogArticles();

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

    const collectionNode: CollectionEdge = {
        node: {
            handle: collectionMoreSell.data.collection.handle,
            title: collectionMoreSell.data.collection.title,
            products: {
                edges: collectionMoreSell.data.collection.products.edges.map(
                    (p) => {
                        const response: ProductNode = {
                            node: { ...p.node },
                        };

                        return response;
                    }
                ),
            },
        },
    };

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
                    {collectionMoreSell && (
                        <Collection
                            collection={collectionNode}
                            transparent={true}
                            center={true}
                        />
                    )}
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
