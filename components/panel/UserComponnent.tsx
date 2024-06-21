import { User } from "@prisma/client";
import { AccountItem } from "../AccountItem";

interface UserComponentProps {
    user: User;
}

export function UserComponent({ user }: UserComponentProps) {
    return (
        <>
            <a href="#/auth/sign-in">
                <AccountItem user={user} />
            </a>
        </>
    );
}
