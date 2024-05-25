import { Filter } from "@/components/icons/Icons";
import { ProductList } from "@/components/pageSearch/ProductList";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getCollection } from "@/shopify";

const fetchData = async () => {
    try {
        const products = await getCollection("pele-oleosa");

        return products;
    } catch (error) {
        console.log(error);
    }
};

export default async function SearchPage() {
    const products = await fetchData();

    return (
        <>
            <div className="w-full px-4 my-16">
                <div className="w-ful mx-auto max-w-bisyouContainerHome grid grid-cols-[300px_auto] gap-14">
                    <div className="flex flex-col gap-5">
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
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
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
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
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
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
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
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
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
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
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
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">

                        {products && <ProductList data={products.data} />}
                    </div>
                </div>
            </div>
        </>
    );
}
