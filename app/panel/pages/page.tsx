import { PagesList } from "@/components/panel/pages/List";
import prisma from "@/lib/client";
import { UserByToken } from "@/util/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function isLogged() {
    try {
        const cookieStore = cookies();

        const token: any = cookieStore.get("auth");

        const cookieResponse = token.value as string;

        const userByToken = new UserByToken();

        const isValid = await userByToken.checkToken(cookieResponse);

        return isValid;
    } catch (error) {
        return redirect("/panel/login");
    }
}

export default async function Panel() {
    await isLogged();
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
