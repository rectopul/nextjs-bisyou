import { ShopsList } from "@/components/panel/pages/Shops/ShopsList";
import { StoreSettings } from "@/components/panel/pages/settings/Store";
import prisma from "@/lib/client";

const getData = async () => {
    const stores = await prisma.shopLocations.findMany();

    return { stores };
};

export default async function Page() {
    const { stores } = await getData();
    return (
        <>
            <ShopsList stores={stores} />
        </>
    );
}
