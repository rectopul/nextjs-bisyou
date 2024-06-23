import { Amex, Dinners, Elo, MasterCard, Visa } from "./icons/Icons";

interface CardSelectProps {
    brand: string;
}

export function CardSelect({ brand }: CardSelectProps) {
    //elo;mastercard;dinners;visa

    switch (brand) {
        case "visa":
            return (
                <>
                    <Visa size={60} />
                </>
            );
        case "mastercard":
            return (
                <>
                    <MasterCard size={60} />
                </>
            );

        case "elo":
            return (
                <>
                    <Elo size={60} />
                </>
            );
        case "dinners":
            return (
                <>
                    <Dinners size={60} />
                </>
            );
        case "amex":
            return (
                <>
                    <Amex size={60} />
                </>
            );
        default:
            return null; // Ou outra reação a um valor de 'brand' inesperado
    }
}
