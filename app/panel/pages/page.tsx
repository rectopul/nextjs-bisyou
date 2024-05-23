import { Pages } from "@/api/pages";
import { NavBar } from "@/components/panel/NavBar";
import { Aside } from "@/components/panel/Sidebar";
import { PagesList } from "@/components/panel/pages/List";
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

const pages = new Pages();

export default async function Panel() {
    const userData = await isLogged();
    const pages_list = await pages.getAll();

    return (
        <>
            <div className="min-h-screen bg-blue-gray-50/50">
                <PagesList pages={pages_list} />
            </div>
        </>
    );
}
