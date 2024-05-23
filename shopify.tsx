import { Product, ProductObject } from "./@types/ProductObject";
import { ProductCollectionObject, Products } from "./@types/ProductsCollection";
import { BlogObject } from "./@types/shopify/BlogObject";
import {
    CollectionObject,
    CollectionSingleObject,
} from "./@types/shopify/Collections";
import {
    DataProductWithMedia,
    ProductWithMedia,
} from "./@types/shopify/ProductWithMedia";

const domain = process.env.SHOPIFY_STORE_DOMAIN || "";
const storeFrontAccessToken =
    process.env.SHOPIFY_STROREFRONT_ACCESS_TOKEN || "";

async function ShopifyData(query: string): Promise<any> {
    const URL = `https://${domain}/api/2024-04/graphql.json`;

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storeFrontAccessToken,
        },
        body: JSON.stringify({ query }),
    };

    try {
        const data = await fetch(URL, options);
        return data.json();
    } catch (error) {
        console.log(`erro na busca de produtos`, error);
        throw new Error(`Erro ao buscar produtos`);
    }
}

export async function getProductsInCollection() {
    const query = `
    {
        collection(handle: "frontpage") {
          id
          title
          products(first: 25) {
            edges {
              node {
                id
                title
                availableForSale
                description
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                
                handle
                featuredImage {
                  altText
                  height
                  id
                  url
                  width
                }
                images(first: 5) {
                  edges {
                    node {
                      altText
                      width
                      height
                      url
                    }
                  }
                }
                
                variants(first: 10) {
                  edges {
                    cursor
                    node {
                      id
                      title
                      availableForSale
                      metafield (key: "nome") {
                        description
                        id
                        key
                        type
                        value
                        namespace
                      }
                      image {
                        altText
                        height
                        id
                        url
                        width
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                
                options {
                  id
                  name
                  values
                  __typename
                }
              }
            }
          }
        }
    }`;

    try {
        const response: ProductCollectionObject = await ShopifyData(query);

        const allProducts = response.data.collection.products;

        return allProducts;
    } catch (error) {
        throw error;
    }
}

export async function getProductShopify(
    handle: string
): Promise<Product | null> {
    const query = `{
        product(handle: "${handle}") {
          availableForSale
          collections(first: 10) {
            edges {
              node {
                title
                handle
                products(first: 10) {
                  edges {
                    node {
                      availableForSale
                      title
                      description
                      id
                      handle
                      options(first: 10) {
                        id
                        name
                        values
                      }
                      featuredImage {
                        altText
                        width
                        height
                        id
                        thumbnail: url(transform: {maxWidth: 100})
                        url
                      }
                      priceRange {
                        maxVariantPrice {
                          amount
                        }
                      }
                      compareAtPriceRange {
                        maxVariantPrice {
                          amount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          tags
          variants(first: 10) {
            edges {
              node {
                availableForSale
                title
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
                compareAtPrice {
                  amount
                }
                price {
                  amount
                }
                image {
                  altText
                  height
                  id
                  url(transform: {maxWidth: 1000})
                  thumbnail: url(transform: {maxWidth: 100})
                  width
                }
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          compareAtPriceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          title
          description
          descriptionHtml
          seo {
            description
            title
          }
          images(first: 10) {
            edges {
              node {
                altText
                id
                url(transform: {maxWidth: 1000})
                thumbnail: url(transform: {maxWidth: 100})
              }
            }
          }
          featuredImage {
            id
            altText
            height
            url
            thumbnail: url(transform: {maxWidth: 100})
            width
          }
          metafield(key: "propriedades", namespace: "custom") {
            references(first: 10) {
              edges {
                node {
                  ... on Metaobject {
                    id
                    fields {
                      key
                      value
                    }
                    handle
                  }
                }
              }
            }
          }
          comparator: metafield(key: "comparator", namespace: "custom") {
            reference {
              ...on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ...on MediaImage {
                      alt
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
    }`;

    try {
        const response: ProductObject = await ShopifyData(query);

        const product: Product | null = response.data.product;

        return product;
    } catch (error) {
        throw error;
    }
}

export async function getProductWithMediaShopify(
    handle: string
): Promise<ProductWithMedia | null> {
    const query = `query GetProductWithMedia {
      product(handle: "${handle}") {
        title
        compareAtPriceRange {
          maxVariantPrice {
            amount
          }
        }
        priceRange {
          maxVariantPrice {
            amount
          }
        }
        description
        descriptionHtml
        variants(first: 5) {
          edges {
            node {
              price {
                amount
              }
              selectedOptions {
                name
                value
              }
              sku
              title
              compareAtPrice {
                amount
              }
              id
              availableForSale
              image {
                altText
                id
                height
                url
                thumbnail: url(transform: {maxWidth: 300})
                width
              }
            }
          }
        }
        createdAt
        featuredImage {
          altText
          height
          id
          url
          thumbnail: url(transform: {maxWidth: 300})
          width
        }
        handle
        id
        images(first: 10) {
          edges {
            node {
              altText
              height
              id
              url
              thumbnail: url(transform: {maxWidth: 300})
              width
            }
          }
        }
        media(first: 5) {
          edges {
            node {
              ... on ExternalVideo {
                id
                alt
                embedUrl
                originUrl
                host
                previewImage {
                  altText
                  id
                  width
                  url
                  thumbnail: url(transform: {maxWidth: 300})
                }
              }
            }
          }
        }
      }
    }`;

    try {
        const response: DataProductWithMedia = await ShopifyData(query);

        const product = response.data.product;

        return product;
    } catch (error) {
        throw error;
    }
}

export async function getCollections(
    qtd?: number
): Promise<CollectionObject | null> {
    const query = `{
      collections(first: ${qtd || 10}) {
        edges {
          node {
            title
            handle
            id
            image {
              altText
              width
              height
              id
              url
              thumbnail: url(transform: {maxWidth: 250, maxHeight: 250, crop: CENTER})
            }
          }
        }
      }
    }`;

    try {
        const response: CollectionObject = await ShopifyData(query);

        const collections: CollectionObject | null = response;

        return collections;
    } catch (error) {
        throw error;
    }
}

export async function getCollection(
    handler: string
): Promise<CollectionSingleObject | null> {
    const query = `{
      collection(handle: "${handler}") {
        handle
        id
        title
        products(first: 15) {
          edges {
            node {
              id
              handle
              description
              featuredImage {
                url
                thumbnail: url(transform: {maxWidth: 300, maxHeight: 300})
                id
                height
                altText
                width
              }
              images(first: 10) {
                edges {
                  node {
                    altText
                    height
                    id
                    url
                    thumbnail: url(transform: {maxHeight: 300, maxWidth: 300})
                    width
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                }
                minVariantPrice {
                  amount
                }
              }
              media(first: 10) {
                edges {
                  node {
                    mediaContentType
                    ... on ExternalVideo {
                      id
                      embedUrl
                      embeddedUrl
                      originUrl
                      previewImage {
                        altText
                        height
                        src
                        url
                        width
                        id
                      }
                      alt
                    }
                    alt
                    id
                    ... on Video {
                      id
                      previewImage {
                        altText
                        height
                        id
                        url
                        width
                      }
                      alt
                    }
                    ... on MediaImage {
                      id
                      alt
                      image {
                        altText
                        height
                        url
                        width
                      }
                    }
                  }
                }
              }
              availableForSale
              title
              options(first: 10) {
                name
                values
                id
              }
              variants(first: 10) {
                nodes {
                  availableForSale
                  compareAtPriceV2 {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  id
                  price {
                    amount
                  }
                  priceV2 {
                    amount
                  }
                  selectedOptions {
                    name
                    value
                  }
                  sku
                  title
                }
              }
              compareAtPriceRange {
                maxVariantPrice {
                  amount
                }
                minVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }`;

    try {
        const response: CollectionSingleObject = await ShopifyData(query);

        return response;
    } catch (error) {
        throw error;
    }
}

export async function getBlogArticles(
    handler: string = "news"
): Promise<BlogObject | null> {
    const query = `query GetBlogArticles {
      blog(handle: "${handler}") {
        id
        handle
        title
        articles(first: 10) {
          edges {
            node {
              authorV2 {
                name
                lastName
                firstName
                bio
              }
              contentHtml
              excerptHtml
              handle
              id
              image {
                altText
                height
                id
                width
                url
                thumbnail: url(transform: {maxWidth: 520, maxHeight: 210, crop: CENTER})
              }
              title
              tags
              publishedAt
            }
          }
        }
      }
    }`;

    try {
        const response: BlogObject = await ShopifyData(query);

        return response;
    } catch (error) {
        throw error;
    }
}
