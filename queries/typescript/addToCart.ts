export const ADD_TO_CART = `mutation AddLineItemsToCheckout($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
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
                  height
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
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }`;
