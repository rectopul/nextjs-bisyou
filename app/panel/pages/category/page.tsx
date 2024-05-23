import { CategoryList } from "@/components/panel/pages/category/List";
import prisma from "@/lib/client";

export default async function Categories() {
    const categories = await prisma.category.findMany();

    return (
        <>
            <CategoryList categories={categories} />
        </>
    );
}
