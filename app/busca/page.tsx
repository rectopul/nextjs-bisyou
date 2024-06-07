import { SearchFilter } from "@/components/pageSearch/Filter";
import { ProductList } from "@/components/pageSearch/ProductList";
import { getCollection, getMetaObject, listCategories } from "@/shopify";
import { cache } from "react";

const fetchData = cache(async () => {
    const products = await getCollection("pele-oleosa");
    const categories = await listCategories();
    const skinType = await getMetaObject("topo_de_pelle");
    const need = await getMetaObject("necessidade");
    const product_type = await getMetaObject("tipo_de_produto");

    return { products, categories, skinType, need, product_type };
});

export default async function SearchPage() {
    const { products, categories, skinType, need, product_type } =
        await fetchData();

    return (
        <>
            <div className="w-full px-4 my-16">
                <div className="relative  w-ful mx-auto max-w-bisyouContainerHome grid grid-cols-1 md:grid-cols-[300px_auto] gap-5 md:gap-14">
                    <SearchFilter
                        categories={categories}
                        props={[skinType, need, product_type]}
                    />

                    <div className="flex flex-col">
                        {products && <ProductList data={products.data} />}
                    </div>
                </div>
            </div>
        </>
    );
}
