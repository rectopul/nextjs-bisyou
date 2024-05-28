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

const fontPoppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    style: ["normal"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        <html
            lang="en"
            className={`${fontSans.variable} ${fontPoppins.variable}`}
        >
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased"
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
