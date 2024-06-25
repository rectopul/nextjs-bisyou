"use client";

import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface AlertDialogProps {
    children: React.ReactNode;
    textTrigger: string;
}

export function AlertDialog({ children, textTrigger }: AlertDialogProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>{textTrigger}</Button>
            <div
                data-open={isOpen}
                className="w-full data-[open=true]:animate-in data-[open=true]:fade-in-100 transition-all o duration-300 data-[open=false]:animate-out data-[open=false]:fade-out-0 fixed left-0 top-0 bg-black bg-opacity-45 flex justify-center items-center p-3"
            >
                <div
                    data-open={isOpen}
                    className="w-full data-[open=true]:animate-in data-[open=true]:animate-inslide-in-from-top-0 data-[open=false]:animate-out data-[open=false]:slide-out-to-bottom-10 max-w-[600px] bg-white rounded-lg p-4 flex flex-col relative"
                >
                    <span className="flex justify-center items-center bg-red-500 text-white w-6 h-6 rounded-md">
                        <X size={15} />
                        {children}
                    </span>
                </div>
            </div>
        </>
    );
}
