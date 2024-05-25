export const PRODUCT_FRAGMENT = `
fragment ProductFragment on Product {
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
                                thumbnail: url(transform: { maxWidth: 100 })
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
                    url(transform: { maxWidth: 1000 })
                    thumbnail: url(transform: { maxWidth: 100 })
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
                url(transform: { maxWidth: 1000 })
                thumbnail: url(transform: { maxWidth: 100 })
            }
        }
    }
    featuredImage {
        id
        altText
        height
        url
        thumbnail: url(transform: { maxWidth: 100 })
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
}
`;
