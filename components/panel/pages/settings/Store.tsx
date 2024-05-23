import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/client";
import { StoreForm } from "./store/Form";

export async function StoreSettings() {
    const settings = await prisma.settings.findFirst();

    if (!settings) return null;

    return (
        <div className="w-full xl:w-[85%] mt-10 gap-3 grid grid-cols-1 xl:grid-cols-3 grid-rows-7 xl:grid-rows-2">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Sobre a loja</CardTitle>
                        <CardDescription>
                            Configuração de informaçoes sobre a loja
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <StoreForm settings={settings} />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Conteúdo da loja</CardTitle>
                        <CardDescription>
                            Configuração de informaçoes sobre o conteúdo da loja
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <StoreForm settings={settings} />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Páginas da loja</CardTitle>
                        <CardDescription>
                            Configuração de informaçoes sobre as páginas da loja
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <StoreForm settings={settings} />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Banners da loja</CardTitle>
                        <CardDescription>
                            Configuração de informaçoes sobre os banners da loja
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <StoreForm settings={settings} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
