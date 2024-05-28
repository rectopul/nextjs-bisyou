const CREATE_CART = `mutation cartCreate {
    cartCreate(input: {}) {
      cart {
        id
        totalQuantity
        createdAt
        cost {
          subtotalAmount {
            amount
          }
          subtotalAmountEstimated
          totalAmount {
            amount
          }
          totalDutyAmount {
            amount
          }
          totalTaxAmount {
            amount
          }
        }
        lines(first: 10) {
          edges {
            node {
              id
            }
          }
        }
        checkoutUrl
        buyerIdentity {
          countryCode
          email
          phone
        }
      }
    }
  }`;
