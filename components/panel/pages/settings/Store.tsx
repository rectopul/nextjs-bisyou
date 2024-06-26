import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StoreForm } from "./store/Form"
import { MissionForm } from "./store/MissionForm"
import { StoreCardsSettings } from "./store/CardsSelect"
import { Settings } from "@prisma/client"
import { SocialsForm } from "./store/SocialsForm"

interface StoreSettingsProps {
  settings: Settings | null
}

export async function StoreSettings({ settings }: StoreSettingsProps) {
  if (!settings) return null

  return (
    <div className="w-full xl:w-[85%] mt-10 gap-3 grid grid-cols-1 xl:grid-cols-3 grid-rows-7 xl:grid-rows-2">
      <div>
        <Card className="h-full">
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
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Missão da empresa</CardTitle>
            <CardDescription>
              Informe um texto descritivo sobre qual a missão da empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <MissionForm settings={settings} />
          </CardContent>
        </Card>
      </div>
      <div>
        <StoreCardsSettings settings={settings} />
      </div>
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Redes sociais</CardTitle>
            <CardDescription>Informe as redes sociais da loja</CardDescription>
          </CardHeader>
          <CardContent>
            <SocialsForm settings={settings} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
