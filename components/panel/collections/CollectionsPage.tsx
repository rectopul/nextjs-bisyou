import prisma from "@/lib/client";
import { CollectionsTable } from "./CollectionsTable";
import { listCollections } from "@/shopify";

export async function CollectionsPage() {
    return (
        <>
            <div className="w-full flex flex-col gap-5 my-10">
                <div className="w-full flex justify-between">
                    <h2 className="text-hd-3">Coleções</h2>
                </div>
                <CollectionsTable />
            </div>
        </>
    );
}
