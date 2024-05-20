import { UserByToken } from "@/util/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout() {
    try {
        const logout = await fetch("/api/user/logout");

        if (!logout.ok) {
            throw new Error(`Erro interno`);
        }

        const response = await logout.json();

        return response;
    } catch (error) {
        return redirect("/panel/login");
    }
}

export default async function Panel() {
    const userData = await logout();

    if (userData) {
        return redirect("/panel/login");
    }

    return (
        <>
            <h1>Erro ao fazer logout</h1>
        </>
    );
}
