import { Product, ProductObject } from "./@types/ProductObject";
import { ProductCollectionObject, Products } from "./@types/ProductsCollection";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storeFrontAccessToken =
    process.env.NEXT_PUBLIC_SHOPIFY_STROREFRONT_ACCESS_TOKEN || "";

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

export async function getProductShopify(handle: string): Promise<Product> {
    const query = `{
        product(handle: "vitamina-c-bisyou") {
          availableForSale
          collections(first: 10) {
            edges {
              node {
                title
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

        const product: Product = response.data.product;

        return product;
    } catch (error) {
        throw error;
    }
}
