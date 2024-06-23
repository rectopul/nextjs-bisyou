export const CREATE_CHECKOUT = `mutation checkoutCreate {
    checkoutCreate(input: {}) {
      checkout {
        id
        webUrl
        createdAt
        lineItemsSubtotalPrice {
          amount
        }
        paymentDue {
          amount
        }
        ready
        totalDuties {
          amount
        }
        totalPrice {
          amount
        }
        totalTax {
          amount
        }
        updatedAt
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
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }`;

//gid://shopify/Checkout/c76ea04fd6ea1ccdc733c179db34bbc0?key=99ceb894989a48ae28b4c064fe5c6164
