"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/icons/Icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useWindowSize from "@/util/useWindowSize";

export function SearchFilter() {
    const [show, setShow] = useState<boolean>(false);
    const [isMobile, setIsmobile] = useState<boolean>(false);
    const size = useWindowSize().width;

    useEffect(() => {
        setIsmobile(size < 767 ? true : false);
    }, []);

    const variants = {
        hidden: { x: -180 },
        visible: { x: 0 },
    };

    return (
        <>
            <Button
                variant="bisCarousel"
                className="font-bold md:hidden absolute right-10 top-0 w-8 h-8 p-2"
                onClick={() => setShow(!show)}
            >
                <Filter size={23} strokeWidth={6} />
            </Button>

            <motion.div
                className="flex flex-col bg-white max-md:rounded-md gap-5 z-20 max-md:-translate-x-full absolute md:relative top-0 -left-3 max-md:p-3 max-md:shadow"
                variants={variants}
                initial={isMobile ? "hidden" : "visible"}
                transition={{ duration: 0.1 }}
                animate={
                    isMobile && show
                        ? "visible"
                        : isMobile
                        ? "hidden"
                        : "visible"
                }
            >
                <div className="w-full flex justify-between text-bisyou-icon items-center">
                    <h2 className="text-2xl">Filtrar por</h2>

                    <span className="font-bold">
                        <Filter size={23} strokeWidth={6} />
                    </span>
                </div>
                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <Select>
                            <SelectTrigger className="focus:ring-0 focus:ring-offset-2 ring-offset-bisyou-icon w-full h-9 bg-bisyou-yellow text-[16px] text-bisyou-icon border-0 font-medium rounded-full px-5">
                                <SelectValue placeholder="etapa" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <Select>
                            <SelectTrigger className="focus:ring-0 focus:ring-offset-2 ring-offset-bisyou-icon w-full h-9 bg-bisyou-yellow text-[16px] text-bisyou-icon border-0 font-medium rounded-full px-5">
                                <SelectValue placeholder="tipo de pele" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ul className="w-full flex flex-col gap-2 pl-6 font-medium">
                    <li>
                        <a
                            href="#"
                            className="text-bisyou-icon data-[active=true]:font-bold hover:underline"
                        >
                            Madura
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-active={true}
                            className="text-bisyou-icon data-[active=true]:font-bold hover:underline"
                        >
                            Oleosa
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-bisyou-icon data-[active=true]:font-bold hover:underline"
                        >
                            Mista
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-bisyou-icon data-[active=true]:font-bold hover:underline"
                        >
                            Seca
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-bisyou-icon data-[active=true]:font-bold hover:underline"
                        >
                            Sensivel
                        </a>
                    </li>
                </ul>

                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <Select>
                            <SelectTrigger className="focus:ring-0 focus:ring-offset-2 ring-offset-bisyou-icon w-full h-9 bg-bisyou-yellow text-[16px] text-bisyou-icon border-0 font-medium rounded-full px-5">
                                <SelectValue placeholder="necessidade" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <Select>
                            <SelectTrigger className="focus:ring-0 focus:ring-offset-2 ring-offset-bisyou-icon w-full h-9 bg-bisyou-yellow text-[16px] text-bisyou-icon border-0 font-medium rounded-full px-5">
                                <SelectValue placeholder="ingredientes" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <Select>
                            <SelectTrigger className="focus:ring-0 focus:ring-offset-2 ring-offset-bisyou-icon w-full h-9 bg-bisyou-yellow text-[16px] text-bisyou-icon border-0 font-medium rounded-full px-5">
                                <SelectValue placeholder="textura" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <Select>
                            <SelectTrigger className="w-full h-9 bg-bisyou-yellow text-[16px] focus:ring-0 focus:ring-offset-2 ring-offset-bisyou-icon text-bisyou-icon border-0 font-medium rounded-full px-5">
                                <SelectValue placeholder="qualidade" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
