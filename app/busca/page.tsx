import { Filter } from "@/components/icons/Icons";
import { SearchFilter } from "@/components/pageSearch/Filter";
import { ProductList } from "@/components/pageSearch/ProductList";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getCollection } from "@/shopify";

const fetchData = async () => {
    try {
        const products = await getCollection("pele-oleosa");

        return products;
    } catch (error) {
        console.log(error);
    }
};

export default async function SearchPage() {
    const products = await fetchData();

    return (
        <>
            <div className="w-full px-4 my-16">
                <div className="relative  w-ful mx-auto max-w-bisyouContainerHome grid grid-cols-1 md:grid-cols-[300px_auto] gap-5 md:gap-14">
                    <SearchFilter />

                    <div className="flex flex-col">
                        {products && <ProductList data={products.data} />}
                    </div>
                </div>
            </div>
        </>
    );
}
