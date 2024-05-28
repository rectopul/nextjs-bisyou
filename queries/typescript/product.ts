export const PRODUCT_FRAGMENT_WHIT_COLLECTION = `fragment CollectionFragMent on Collection {
    handle
    title
    products(first: 10) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
}`;

export const VARIANT_FRAGMENT = `fragment VariantFragment on ProductVariant {
    id
    availableForSale
    title
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
      thumbnail: url(transform: {maxWidth: 150})
      width
    }
  }`;

export const PRODUCT_FRAGMENT = `fragment ProductFragment on Product {
    availableForSale
    tags
    id
    handle
    variants(first: 10) {
      edges {
        node {
            ...VariantFragment
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
          width
          height
          id
          url(transform: {maxWidth: 1000})
          thumbnail: url(transform: {maxWidth: 300})
        }
      }
    }
    featuredImage {
      id
      altText
      height
      url
      thumbnail: url(transform: {maxWidth: 300})
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
        ... on Metaobject {
          fields {
            key
            value
            reference {
              ... on MediaImage {
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
  }`;
