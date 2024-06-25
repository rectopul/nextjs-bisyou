import { BannersTable } from "@/components/panel/Banners/Table/BannersTable"
import prisma from "@/lib/client"

const getData = async () => {
  const banners = await prisma.banners.findMany({
    include: { image: { include: { thumbnail: true } } },
  })

  return { banners }
}

export default async function Banners() {
  const { banners } = await getData()

  return (
    <>
      <div className="w-full flex flex-col my-10 xl:px-5">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-hd-2">Banners</h2>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h3>Lista</h3>

          <div>
            <BannersTable banners={banners} />
          </div>
        </div>
      </div>
    </>
  )
}
