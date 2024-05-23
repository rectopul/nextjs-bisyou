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
            <h1>DashBoard</h1>
        </>
    );
}
