import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans, Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import CartProvider from "@/providers/Cart";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Bis You",
    description: "Loja da bis you",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${fontSans.variable}`}>
            <body
                className={cn(
                    "min-h-screen bg-background font-fabriga antialiased"
                )}
            >
                <CartProvider>{children}</CartProvider>
                <Toaster
                    richColors
                    toastOptions={{
                        classNames: {
                            success:
                                "!bg-green-500 !border !border-green-600 !bg-opacity-80 !rounded-md !text-white !shadow",
                            error: "!bg-red-600 !bg-opacity-80 !text-white !border-red-700",
                        },
                    }}
                />
            </body>
        </html>
    );
}
