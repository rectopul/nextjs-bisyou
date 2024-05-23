"use client";

import { usePathname } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuSub,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, Layers, Plus, SquareMenu } from "lucide-react";

export function ItemPageSidebar() {
    const pathName = usePathname();

    const separatorPath = pathName.split("/");
    const currentPage = separatorPath.at(-1);

    console.log(`current`, currentPage);
    console.log(`path includes: `, pathName.includes("pages/create"));

    return (
        <li
            className={
                currentPage === "pages"
                    ? "active"
                    : pathName.includes("page/create")
                    ? "active"
                    : ""
            }
        >
            <DropdownMenu>
                {currentPage === "pages" ||
                pathName.includes("pages/create") ||
                pathName.includes("pages/category") ? (
                    <DropdownMenuTrigger className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 items-center w-full select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg relative overflow-hidden active:bg-blue-gray-500/30 flex gap-4 px-4 capitalize">
                        <SquareMenu size={20} />
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                            Páginas
                        </p>
                    </DropdownMenuTrigger>
                ) : (
                    <DropdownMenuTrigger className="items-center w-full select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 relative overflow-hidden active:bg-blue-gray-500/30 flex gap-4 px-4 capitalize">
                        <SquareMenu size={20} />
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                            Páginas
                        </p>
                    </DropdownMenuTrigger>
                )}

                <DropdownMenuContent
                    className="w-[250px] !-right-14"
                    align="start"
                >
                    <DropdownMenuLabel>Páginas</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <a href="/panel/pages" className="flex items-center">
                            <AlignJustify size={15} className="mr-2" />
                            Todas as páginas
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Layers size={15} className="mr-2" />
                            Categorias
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <a
                                        href="/panel/pages/category"
                                        className="flex items-center"
                                    >
                                        <AlignJustify className="mr-2 h-4 w-4" />
                                        <span>Todas as categorias</span>
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a
                                        href="/panel/pages/category/create"
                                        className="flex items-center"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>Nova</span>
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <a
                            href="/panel/pages/create"
                            className="flex items-center"
                        >
                            <Plus size={15} className="mr-2" />
                            Nova
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    );
}
