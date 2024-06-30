import { About } from "@/components/About"
import { BlogArticlesCarousel } from "@/components/BlogArticlesCarousel"
import Footer from "@/components/Footer"
import { Header } from "@/components/Header"
import { MiniBanner } from "@/components/MiniBanner"
import { FeaturedProductWithMedia } from "@/components/ProductWithMedia"
import { Collection } from "@/components/collection/Collection"
import { FullBanners } from "@/components/home/FullBanners"
import { Selos } from "@/components/home/Selos"
import { Avaliation } from "@/components/product/Avaliation"
import { FeaturedModel2 } from "@/components/product/FeaturedModel2"
import { QuickView } from "@/components/quickview"
import { ListRullerOptions } from "@/components/rullerOptions/List"
import { ShopCollections } from "@/components/shopCollections/List"
import prisma from "@/lib/client"
import CartProvider from "@/providers/Cart"
import QuicViewProvider from "@/providers/QuickView"
import {
  getBlogArticles,
  getCollection,
  getProductWithMediaShopify,
} from "@/shopify"
import { Prisma } from "@prisma/client"
import { Suspense } from "react"

export type BannersWithImages = Prisma.BannersGetPayload<{
  include: { image: { include: { thumbnail: true } } }
}>

const fetchData = async () => {
  try {
    const collectionHome = await prisma.colletions.findFirst({
      where: { position: "productpage", active: true, order: { not: 0 } },
      orderBy: { order: "asc" },
    })

    if (!collectionHome) return

    const banners = await prisma.banners.findMany({
      include: { image: { include: { thumbnail: true } } },
    })

    const fullBanners = banners.filter((b) => b.position !== "mini")

    const rullerOptions = await prisma.rullerOptions.findMany()

    const collections = await prisma.colletions.findMany({
      where: { position: "homepage", active: true, order: { not: 0 } },
      orderBy: { order: "asc" },
      take: 5,
    })

    const collectionMoreSell = await getCollection(
      collectionHome.slug,
      collectionHome.products_quantity,
    )

    const miniBanner: BannersWithImages = banners.filter(
      (b) => b.position === "mini",
    )[0]

    const settings = await prisma.settings.findFirst({
      orderBy: { id: "desc" },
    })

    const partners = await prisma.partners.findMany({
      orderBy: { id: "desc" },
    })

    const blogArticles = await getBlogArticles()

    if (!settings || settings.product_video === null) return

    const productWithMedia = await getProductWithMediaShopify(
      settings.product_video,
    )

    const featuredKit = await getProductWithMediaShopify(settings.product_video)

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
    }
  } catch (error) {
    throw error
  }
}

export default async function Home() {
  const shopParameters = await fetchData()

  if (!shopParameters)
    return (
      <>
        <div className="w-full text-center py-10 font-bold text-3xl">
          Complete a configuração da loja
        </div>
      </>
    )

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
  } = shopParameters

  if (!collectionMoreSell) {
    return <h1>Erro de servidor</h1>
  }

  function Loading() {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }

  return (
    <CartProvider>
      <Header />
      <QuicViewProvider>
        <main className="flex min-h-screen w-full flex-col items-center">
          {fullBanners && <FullBanners banners={fullBanners} />}
          <ListRullerOptions ruller_options={rullerOptions} />
          {fullBanners && <Selos banners={fullBanners} />}
          {collections && <ShopCollections collections={collections} />}

          <Suspense fallback={<Loading />}>
            {collectionMoreSell && collectionMoreSell.data.collection && (
              <Collection
                collection={collectionMoreSell.data.collection}
                transparent={true}
                center={true}
              />
            )}
            <QuickView />
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
          {blogArticles && <BlogArticlesCarousel blogObject={blogArticles} />}

          {/* {settings && partners && (
                        <SectionPartners
                            partners={partners}
                            settings={settings}
                        />
                    )} */}
        </main>
      </QuicViewProvider>
      <Footer />
    </CartProvider>
  )
}
