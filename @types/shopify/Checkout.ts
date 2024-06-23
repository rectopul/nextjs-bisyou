export interface CheckoutData {
    data: DataCheckout | null;
}

export interface DataCheckout {
    checkoutLineItemsAdd: CheckoutLineItemsAdd;
}

export interface CheckoutLineItemsAdd {
    checkout: Checkout;
    checkoutUserErrors: any[];
}

export interface Checkout {
    id: string;
    webUrl: string;
    lineItems: LineItems;
}

export interface LineItems {
    edges: LineItemEdge[];
}

export interface LineItemEdge {
    node: LineItemNode;
}

export interface LineItemNode {
    title: string;
    quantity: number;
    id: string;
    unitPrice: any;
    variant: Variant;
}

export interface Variant {
    id: string;
    image: Image;
    price: Price;
    title: string;
    selectedOptions: SelectedOption[];
}

export interface Image {
    altText: any;
    height: number;
    id: string;
    width: number;
    url: string;
}

export interface Price {
    amount: string;
}

export interface SelectedOption {
    name: string;
    value: string;
}
