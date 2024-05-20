import React from "react";

export const metadata = {
    title: "Painel administrativo BisYou",
    description: "Painel para administração do tema bisyou",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
