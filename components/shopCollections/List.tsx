import { CollectionObject } from "@/@types/shopify/Collections";
import Image from "next/image";

interface ShopCollections {
    collections: CollectionObject;
}

export function ShopCollections({ collections }: ShopCollections) {
    return (
        <>
            <div className="w-full px-4 xl:my-[40px]">
                <div className="w-full max-w-bisyouContainerHome flex justify-between mx-auto">
                    {collections.data.collections.edges.map((c) => (
                        <div
                            key={`cll-${c.node.id}`}
                            className="flex flex-col gap-3"
                        >
                            <a
                                href={`/collecoes/${c.node.handle}`}
                                className="w-[200px] h-[200px] relative flex justify-center items-center rounded-full overflow-hidden bg-slate-300"
                            >
                                {c.node.image && (
                                    <Image
                                        alt={
                                            c.node.image.altText ||
                                            c.node.handle
                                        }
                                        src={c.node.image.thumbnail}
                                        width={300}
                                        height={300}
                                        unoptimized
                                        className="h-full"
                                    />
                                )}
                            </a>

                            <span className="mx-auto font-medium text-bisyou-font text-xl">
                                {c.node.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
