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
    const userData = await isLogged();

    return (
        <>
            <div className="w-full px-4">
                <h2>{userData.name}</h2>
                <a href="/panel/logout">Logout</a>
            </div>
        </>
    );
}
