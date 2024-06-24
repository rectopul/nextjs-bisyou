import { PartnersPage } from "@/components/panel/pages/partners/Partners";
import prisma from "@/lib/client";

const getData = async () => {
    const partners = await prisma.partners.findMany();

    return { partners };
};

export default async function Page() {
    const { partners } = await getData();

    return (
        <>
            <PartnersPage partners={partners} />
        </>
    );
}
