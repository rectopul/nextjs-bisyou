import { Button } from "@/components/ui/button";
import { PartnersList } from "./PartnersList";
import prisma from "@/lib/client";
import { FormPartners } from "./FormPartners";

export async function PartnersPage() {
    const partners = await prisma.partners.findMany({
        orderBy: { id: "desc" },
    });

    return (
        <>
            <div className="w-full flex flex-col gap-5 my-10">
                <PartnersList partners={partners} />
            </div>
        </>
    );
}
