import { Errors } from "./Erros";

export interface CartData {
    data: Data;
    errors?: Errors;
}

export interface Data {
    checkoutCreate: CheckoutCreate;
}

export interface CheckoutCreate {
    checkout: Checkout;
    checkoutUserErrors: any[];
}

export interface Checkout {
    id: string;
    webUrl: string;
    lineItems: LineItems;
    subtotalPrice: SubtotalPrice;
    totalPrice: TotalPrice;
    totalTax: TotalTax;
    totalDuties: TotalPrice | null;
}

export interface LineItems {
    edges: ItemEdge[];
}

export interface ItemEdge {
    node: CartItem;
}

export interface CartItem {
    title: string;
    quantity: number;
    id: string;
    unitPrice: any;
    variant: CartVariant;
}

export interface CartVariant {
    id: string;
    image: Image;
    price: Price;
    title: string;
    selectedOptions: SelectedOption[];
}

export interface Image {
    altText: any;
    src: string;
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

export interface SubtotalPrice {
    amount: string;
}

export interface TotalPrice {
    amount: string;
}

export interface TotalTax {
    amount: string;
}
