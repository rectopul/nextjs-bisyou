import { PageResponse } from "@/@types/PageResponse";
import { PageWithImage, PagesTable } from "./Table";

interface PagesListProps {
    pages: PageWithImage[];
}

export function PagesList({ pages }: PagesListProps) {
    return (
        <>
            <div className="mt-12 mb-8 flex flex-col gap-12">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                            Lista de páginas
                        </h6>
                    </div>

                    <div className="p-6 px-0 pt-0 pb-2">
                        <PagesTable pages={pages} />
                    </div>
                </div>
            </div>
        </>
    );
}
