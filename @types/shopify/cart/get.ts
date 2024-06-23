import { LineItems } from "../Checkout";

export interface CartGet {
    node: Node | null;
}

export interface Node {
    id: string;
    webUrl: string;
    lineItems: LineItems;
    totalPrice: CartPrices;
    totalTax: CartPrices;
    subtotalPrice: CartPrices;
    createdAt: string;
    totalDuties: any | null;
}

export interface CartPrices {
    amount: string;
}
