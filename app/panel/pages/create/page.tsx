import { CreatePageForm } from "@/components/panel/pages/CreateForm";
import prisma from "@/lib/client";

export default async function Panel() {
    const categories = await prisma.category.findMany();

    return <>{categories && <CreatePageForm categories={categories} />}</>;
}
