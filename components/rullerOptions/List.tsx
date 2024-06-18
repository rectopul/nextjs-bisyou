import { RullerOptions } from "@prisma/client";

interface RullerOptionsProps {
    ruller_options: RullerOptions[];
}

export function ListRullerOptions({ ruller_options }: RullerOptionsProps) {
    return (
        <>
            <div className="w-full bg-bisyou-fontLight hidden md:flex text-white px-4 py-6 uppercase justify-between gap-40 font-medium text-sm">
                {ruller_options.map((r) => (
                    <div className="p-0" key={`ro-${r.id}`}>
                        {r.title}
                    </div>
                ))}
            </div>
        </>
    );
}
