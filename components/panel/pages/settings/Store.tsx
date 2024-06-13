import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/client";
import { StoreForm } from "./store/Form";
import { MissionForm } from "./store/MissionForm";

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
                        <CardTitle>Missão da empresa</CardTitle>
                        <CardDescription>
                            Informe um texto descritivo sobre qual a missão da
                            empresa
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MissionForm settings={settings} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
