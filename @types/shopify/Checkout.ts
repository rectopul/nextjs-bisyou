import { Checkout } from "./CartObject";

export interface CheckoutData {
    data: {
        node: Checkout | null;
    } | null;
}
