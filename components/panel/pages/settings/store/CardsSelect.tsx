"use client"

import { Amex, Dinners, Elo, MasterCard, Visa } from "@/components/icons/Icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Prisma, Settings } from "@prisma/client"
import { useState } from "react"
import { toast } from "sonner"
import { settings as settingsService } from "@/api/settings.service"
import { Spinner } from "@/components/Spinner"

interface StoreCardsSettingsProps {
  settings: Settings
}

export function StoreCardsSettings({ settings }: StoreCardsSettingsProps) {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const defaultValues =
    settings && settings.shopping_cards
      ? settings.shopping_cards.split(";")
      : []
  const [payments, setPayments] = useState<string[]>(defaultValues)

  if (!settings) return

  const onChange = (value: string, state: boolean) => {
    if (state === true) {
      setPayments((prev) => [value, ...prev])
      console.log(`cards: `, payments)
      return
    }

    const filter = payments.filter((p) => p !== value)

    setPayments(filter)
  }

  const onSave = async () => {
    try {
      setIsLoad(true)

      await settingsService.update(
        { shopping_cards: payments.join(";") },
        settings.id,
      )
      return setIsLoad(false)
    } finally {
      return setIsLoad(false)
    }
  }

  return (
    <>
      <Card className="h-full flex flex-col">
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
                  onCheckedChange={(state) => onChange("mastercard", state)}
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
                  onCheckedChange={(state) => onChange("visa", state)}
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
                  onCheckedChange={(state) => onChange("elo", state)}
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
                  onCheckedChange={(state) => onChange("dinners", state)}
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
                  onCheckedChange={(state) => onChange("amex", state)}
                />
              </div>
              <figure>
                <Amex />
              </figure>

              <span className="font-light">American Express</span>
            </div>

            <Button className="self-start" onClick={onSave}>
              {isLoad ? <Spinner size="sm" /> : "Atualizar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
