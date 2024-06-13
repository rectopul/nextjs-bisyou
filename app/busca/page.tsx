import { SearchFilter } from "@/components/pageSearch/Filter";
import { PageSearchFilter } from "@/components/pageSearch/PageSearchFilter";
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
                {products && (
                    <PageSearchFilter
                        props={[skinType, need, product_type]}
                        categories={categories}
                        data={products.data}
                    />
                )}
            </div>
        </>
    );
}
