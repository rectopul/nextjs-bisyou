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
  }`

export const REMOVE_TO_CART = `mutation RemoveToCart($checkoutId: ID!, $lineItemIds: [ID!]!) {
  checkoutLineItemsRemove(
    checkoutId: $checkoutId
    lineItemIds: $lineItemIds
  ) {
    checkout {
        id
        lineItems(first: 10) {
          edges {
            node {
              id
              title
              quantity
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
}`

export const UPDATE_ITEM_CART = `mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
  checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
    checkout {
      id
      lineItems(first: 10) {
        edges {
          node {
            id
            title
            quantity
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
}`
