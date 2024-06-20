"use client";

import { Amex, Dinners, Elo, MasterCard, Visa } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface StoreCardsSettingsProps {
    settings: Settings;
}

export function StoreCardsSettings({ settings }: StoreCardsSettingsProps) {
    if (!settings) return;
    const defaultValues =
        settings && settings.shopping_cards
            ? settings.shopping_cards.split(";")
            : [];
    const [payments, setPayments] = useState<string[]>(defaultValues);

    const onChange = (value: string, state: boolean) => {
        if (state === true) {
            setPayments((prev) => [value, ...prev]);
            console.log(`cards: `, payments);
            return;
        }

        const filter = payments.filter((p) => p !== value);

        setPayments(filter);
    };

    const onSave = async () => {
        try {
            const options: RequestInit = {
                method: "PUT",
                body: JSON.stringify({
                    ...settings,
                    shopping_cards: payments.join(";"),
                }),
            };

            const req = await fetch(`/api/settings/${settings.id}`, options);

            if (!req.ok) {
                toast.error(`erro ao salvar configurações`);
            }

            toast.success(`Consigurações salvas com sucesso`);
        } catch (error) {
            toast.error(`erro ao salvar configurações`);
            console.log(error);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Pagamentos</CardTitle>
                    <CardDescription>
                        Selecione as bandeiras de cartões aceitas pela loja
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex flex-col gap-4">
                        <div className="grid grid-cols-[50px_30px_auto] gap-2 items-center">
                            <div className="flex items-center">
                                <Switch
                                    checked={payments.includes("mastercard")}
                                    onCheckedChange={(state) =>
                                        onChange("mastercard", state)
                                    }
                                />
                            </div>
                            <figure>
                                <MasterCard />
                            </figure>

                            <span className="font-light">Mastercard</span>
                        </div>

                        <div className="grid grid-cols-[50px_30px_auto] gap-2 items-center">
                            <div className="flex items-center">
                                <Switch
                                    checked={payments.includes("visa")}
                                    onCheckedChange={(state) =>
                                        onChange("visa", state)
                                    }
                                />
                            </div>
                            <figure>
                                <Visa />
                            </figure>

                            <span className="font-light">Visa</span>
                        </div>

                        <div className="grid grid-cols-[50px_30px_auto] gap-2 items-center">
                            <div className="flex items-center">
                                <Switch
                                    checked={payments.includes("elo")}
                                    onCheckedChange={(state) =>
                                        onChange("elo", state)
                                    }
                                />
                            </div>
                            <figure>
                                <Elo />
                            </figure>

                            <span className="font-light">Elo</span>
                        </div>

                        <div className="grid grid-cols-[50px_30px_auto] gap-2 items-center">
                            <div className="flex items-center">
                                <Switch
                                    checked={payments.includes("dinners")}
                                    onCheckedChange={(state) =>
                                        onChange("dinners", state)
                                    }
                                />
                            </div>
                            <figure>
                                <Dinners />
                            </figure>

                            <span className="font-light">Dinners</span>
                        </div>

                        <div className="grid grid-cols-[50px_30px_auto] gap-2 items-center">
                            <div className="flex items-center">
                                <Switch
                                    checked={payments.includes("amex")}
                                    onCheckedChange={(state) =>
                                        onChange("amex", state)
                                    }
                                />
                            </div>
                            <figure>
                                <Amex />
                            </figure>

                            <span className="font-light">American Express</span>
                        </div>

                        <Button className="self-start" onClick={onSave}>
                            Salvar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
