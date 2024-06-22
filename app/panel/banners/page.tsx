import { columns } from "@/components/panel/Banners/Table/columns";
import { DataTable } from "@/components/panel/Banners/Table/data-table";
import { BannerForm } from "@/components/panel/Banners/form/BannerForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
import { Plus } from "lucide-react";


export default async function Banners() {

    const banners = await prisma.banners.findMany({
        include: { image: { include: { thumbnail: true } } },
    });

    return (
        <>
            <div className="w-full flex flex-col my-10 xl:px-5">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-hd-2">Banners</h2>

                    <BannerForm />
                </div>

                <div className="w-full flex flex-col gap-4">
                    <h3>Lista</h3>

                    <div>
                        <DataTable columns={columns} data={banners} />
                    </div>
                </div>
            </div>
        </>
    );
}
