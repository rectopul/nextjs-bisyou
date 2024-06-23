export interface CheckoutCreateData {
    checkoutCreate: CheckoutCreate;
}

export interface CheckoutCreate {
    checkout: Checkout;
    checkoutUserErrors: any[];
}

export interface Checkout {
    id: string;
    webUrl: string;
    createdAt: string;
    lineItemsSubtotalPrice: LineItemsSubtotalPrice;
    paymentDue: PaymentDue;
    ready: boolean;
    totalDuties: any;
    totalPrice: TotalPrice;
    totalTax: TotalTax;
    updatedAt: string;
    lineItems: LineItems;
}

export interface LineItemsSubtotalPrice {
    amount: string;
}

export interface PaymentDue {
    amount: string;
}

export interface TotalPrice {
    amount: string;
}

export interface TotalTax {
    amount: string;
}

export interface LineItems {
    edges: any[];
}
