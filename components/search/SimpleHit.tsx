import { Product } from "@/@types/ProductObject";

interface SimpleHitProps {
    hit: any;
}

export function SimpleHit({ hit }: SimpleHitProps) {
    const res = hit as Product;
    return (
        <>
            <div className="w-full text-start" key={hit.objectID}>
                <a
                    href={`/product/${res.handle}`}
                    className="w-full !text-start text-slate-800 font-medium text-xs hover:underline"
                >
                    {res.title}
                </a>
            </div>
        </>
    );
}
