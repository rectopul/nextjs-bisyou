import { StoreSettings } from "@/components/panel/pages/settings/Store";
import prisma from "@/lib/client";

const getData = async () => {
    const settings = await prisma.settings.findFirst();

    return { settings };
};

export default async function Page() {
    const { settings } = await getData();

    return (
        <>
            <StoreSettings settings={settings} />
        </>
    );
}
