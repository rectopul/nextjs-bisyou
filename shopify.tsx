import { Product, ProductObject } from "./@types/ProductObject";
import { ProductCollectionObject } from "./@types/ProductsCollection";
import { Shopify } from "./@types/shopify";
import {
    CollectionObject,
    CollectionSingleObject,
} from "./@types/shopify/Collections";
import {
    DataProductWithMedia,
    ProductWithMedia,
} from "./@types/shopify/ProductWithMedia";
import { BLOG_ARTICLE_FIELDS } from "./queries/typescript/blog";
import { GET_CHECKOUT } from "./queries/typescript/getCheckout";
import { CREATE_CHECKOUT } from "./queries/typescript/createCheckout";
import {
    PRODUCT_FRAGMENT,
    PRODUCT_FRAGMENT_WHIT_COLLECTION,
    VARIANT_FRAGMENT,
} from "./queries/typescript/product";
import { ADD_TO_CART } from "./queries/typescript/addToCart";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storeFrontAccessToken =
    process.env.NEXT_PUBLIC_SHOPIFY_STROREFRONT_ACCESS_TOKEN || "";

interface GraphQlVariables {
    [key: string]: any;
}

async function ShopifyData(
    query: string,
    variables?: GraphQlVariables
): Promise<any> {
    const URL = `https://${domain}/api/2024-04/graphql.json`;

    if (domain == "") {
        throw new Error(`Não foi possivel localizar a url`);
    }

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storeFrontAccessToken,
        },
        body: JSON.stringify({ query, variables }),
    };

    try {
        const data = await fetch(URL, options);

        return data.json();
    } catch (error) {
        console.log(`erro na query shopify`, query);
        throw new Error(`Erro na query shopify`);
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
    const query = `
    {
      product(handle: "${handle}") {
        ...ProductFragment
        collections(first: 10) {
          edges {
            node {
              ...CollectionFragMent
            }
          }
        }
      }
    }
    ${VARIANT_FRAGMENT}
    ${PRODUCT_FRAGMENT_WHIT_COLLECTION}
    ${PRODUCT_FRAGMENT}
    `;

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
              ...ProductFragment
            }
          }
        }
      }
    }
    ${VARIANT_FRAGMENT}
    ${PRODUCT_FRAGMENT}
    `;

    try {
        const response: CollectionSingleObject = await ShopifyData(query);

        return response;
    } catch (error) {
        throw error;
    }
}

export async function getBlogArticles(
    handler: string = "news"
): Promise<Shopify.Articles | null> {
    const query = `
      query GetBlogArticles {
        blog(handle: "${handler}") {
          id
          handle
          title
          articles(first: 10) {
            edges {
              node {
                ...BlogArticleFields
              }
            }
          }
        }
      }
      ${BLOG_ARTICLE_FIELDS}
    `;

    try {
        const response: Shopify.Articles = await ShopifyData(query);

        return response;
    } catch (error) {
        throw error;
    }
}

export async function searchShop(
    terms: string = "news"
): Promise<Shopify.Search | null> {
    const query = `
      query SearchProductsAndPages($query: String!) {
        products(first: 10, query: $query) {
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
        pages(first: 10, query: $query) {
            edges {
                node {
                    id
                    title
                    handle
                    bodySummary
                    body
                }
            }
        }
      }
      ${PRODUCT_FRAGMENT}
      variables: {
        query: ${terms},
      },
    `;

    try {
        const response: Shopify.Search = await ShopifyData(query);

        return response;
    } catch (error) {
        throw error;
    }
}

export async function createCart(): Promise<Shopify.Cart.Data | null> {
    const query = `
    ${CREATE_CHECKOUT}
    `;

    try {
        const response: Shopify.Cart.Data = await ShopifyData(query);

        if (response.errors) {
            throw new Error(response.errors.errors[0].message);
        }

        return response;
    } catch (error) {
        console.log(`erro ao criar carrinho`, error);
        throw error;
    }
}

export async function getCart(
    checkoutId: string
): Promise<Shopify.Cart.Checkout | null> {
    const query = `
    ${GET_CHECKOUT}
    `;

    try {
        const response: Shopify.Cart.Checkout = await ShopifyData(query, {
            checkoutId,
        });

        return response;
    } catch (error) {
        console.log(`erro na busca do carrinho`, error);
        throw error;
    }
}

export async function addToCart(
    checkoutId: string,
    lineItems: { variantId: string; quantity: number }[]
): Promise<Shopify.Cart.Checkout | null> {
    const query = `
    ${ADD_TO_CART}
    `;

    try {
        const response: Shopify.Cart.Checkout = await ShopifyData(query, {
            checkoutId,
            lineItems,
        });

        return response;
    } catch (error) {
        console.log(`erro na busca do carrinho`, error);
        throw error;
    }
}
