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
import { useState } from "react";

export function SearchFilter() {
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <Button
                variant="bisCarousel"
                className="font-bold absolute right-10 top-0 w-8 h-8 p-2"
                onClick={() => setShow(!show)}
            >
                <Filter size={23} strokeWidth={6} />
            </Button>

            <div
                data-show={show}
                className="flex flex-col bg-white gap-5 z-20 max-md:p-3 transition-all max-md:shadow duration-300 max-md:fade-out-0 max-md:-translate-x-52 max-md:data-[show=true]:-translate-x-0 max-md:data-[show=true]:fade-in-100 max-md:absolute "
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
            </div>
        </>
    );
}
