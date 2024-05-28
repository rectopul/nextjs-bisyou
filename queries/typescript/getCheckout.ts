export const GET_CHECKOUT = `query GetCheckout($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        id
        webUrl
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
              id
              unitPrice {
                amount
              }
              variant {
                id
                image {
                  altText
                  src
                  id
                  width
                  url(transform: {maxWidth: 150})
                }
                price {
                  amount
                }
                title
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
        totalPrice {
            amount
          }
          totalTax {
            amount
          }
          subtotalPrice {
            amount
          }
          createdAt
          totalDuties {
            amount
        }
      }
    }
  }`;
