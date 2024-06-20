import {
    Handshake,
    Home,
    Images,
    MessagesSquare,
    Package,
    Settings,
    SquareStack,
    Store,
} from "lucide-react";
import { SideItem } from "../SideItem";
import { ItemPageSidebar } from "./pages/ItemSideBar";
import prisma from "@/lib/client";
import Image from "next/image";

interface AsideProps {
    name: string;
}

export async function Aside({ name }: AsideProps) {
    const settings = await prisma.settings.findFirst();

    return (
        <div className="bg-white shadow-sm -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
            <div className="relative">
                <a className="py-6 px-8 text-center" href="#/">
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
                        {settings && settings.logo ? (
                            <Image
                                alt={settings.storeSlug}
                                width={143}
                                height={55}
                                src={"/file/" + settings.logo}
                                className="w-[50%] mx-auto"
                            />
                        ) : (
                            name
                        )}
                    </h6>
                </a>
                <button
                    className="align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                    type="button"
                >
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-5 w-5 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </span>
                </button>
            </div>

            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <SideItem slug="panel" link="/panel" name="Dashboard">
                        <Home size={20} />
                    </SideItem>

                    <ItemPageSidebar />

                    <SideItem link="/panel/shops" slug="shops" name="Lojas">
                        <Store size={20} />
                    </SideItem>

                    <SideItem
                        link="/panel/partners"
                        slug="partners"
                        name="Parceiros"
                    >
                        <Handshake size={20} />
                    </SideItem>
                    <SideItem
                        link="/panel/notifications"
                        slug="notifications"
                        name="Notifications"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="w-5 h-5 text-inherit"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </SideItem>

                    <SideItem
                        link="/panel/collections"
                        slug="collections"
                        name="Coleções"
                    >
                        <SquareStack size={20} />
                    </SideItem>

                    <SideItem
                        link="/panel/socials"
                        slug="socials"
                        name="Redes sociais"
                    >
                        <MessagesSquare size={20} />
                    </SideItem>

                    <SideItem
                        link="/panel/banners"
                        slug="banners"
                        name="Banners"
                    >
                        <Images size={20} />
                    </SideItem>

                    <SideItem
                        link="/panel/config"
                        slug="config"
                        name="Configurações"
                    >
                        <Settings size={20} />
                    </SideItem>
                </ul>

                <ul className="mb-4 flex flex-col gap-1">
                    <li className="mx-3.5 mt-4 mb-2">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-black uppercase opacity-75">
                            auth pages
                        </p>
                    </li>

                    <li>
                        <a className="" href="/panel/login">
                            <button
                                className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 w-full flex items-center gap-4 px-4 capitalize"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="w-5 h-5 text-inherit"
                                >
                                    <path d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z"></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                    sign in
                                </p>
                            </button>
                        </a>
                    </li>

                    <li>
                        <a className="" href="/panel/logout">
                            <button
                                className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 w-full flex items-center gap-4 px-4 capitalize"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="w-5 h-5 text-inherit"
                                >
                                    <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z"></path>
                                </svg>
                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                    sign up
                                </p>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
