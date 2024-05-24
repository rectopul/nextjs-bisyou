import Image from "next/image";
import logo from "../public/assets/img/logo-small_large.webp";
import { HeaderActions } from "./header/Actions";
import { NavigationMenu } from "./header/Navigation";
import { AnnoncementBar } from "./header/AnnoncementBar";

export function Header() {
    return (
        <>
            <AnnoncementBar />

            <div className="w-full max-w-bisyouContainer mx-auto py-6 text-center flex justify-center relative">
                <Image
                    alt="bisyou"
                    src={logo}
                    unoptimized
                    width={150}
                    height={100}
                />

                <HeaderActions />
            </div>

            <div className="w-full mx-auto bg-bisyou-gray">
                <div className="w-full max-w-bisyouContainer mx-auto py-4">
                    <NavigationMenu />
                </div>
            </div>
        </>
    );
}
