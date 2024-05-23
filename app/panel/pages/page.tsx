import { PagesList } from "@/components/panel/pages/List";
import prisma from "@/lib/client";

export default async function Panel() {
    const pages_list = await prisma.pages.findMany({
        include: { image: true },
    });

    return (
        <>
            <div className="min-h-screen bg-blue-gray-50/50">
                <PagesList pages={pages_list} />
            </div>
        </>
    );
}
