import { PartnersList } from "./PartnersList";
import { Partners } from "@prisma/client";

interface PartnersPageProps {
    partners: Partners[];
}

export async function PartnersPage({ partners }: PartnersPageProps) {
    return (
        <>
            <div className="w-full flex flex-col gap-5 my-10">
                <PartnersList partners={partners} />
            </div>
        </>
    );
}
