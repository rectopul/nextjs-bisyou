import { Pages } from "@/api/pages";
import { CategoryList } from "@/components/panel/pages/category/List";

const pages_controller = new Pages();

export default async function Categories() {
    const categories = await pages_controller.categories();

    return (
        <>
            <CategoryList categories={categories} />
        </>
    );
}
