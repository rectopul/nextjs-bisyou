import { useRefinementList } from "react-instantsearch";
import { ArrowTopRight } from "./icons/Icons";

interface CustomRefinementListProps {
    attribute: string;
    limit?: number;
    classNames?: {
        item: string;
        root: string;
        label: string;
        count: string;
    };
    onClickSugestions?: (data: string) => void;
}

export function CustomRefinementList({
    attribute,
    classNames,
    limit,
    onClickSugestions,
}: CustomRefinementListProps) {
    const {
        items,
        hasExhaustiveItems,
        createURL,
        refine,
        sendEvent,
        searchForItems,
        isFromSearch,
        canRefine,
        canToggleShowMore,
        isShowingMore,
        toggleShowMore,
    } = useRefinementList({ attribute });

    const handleCreateUrl = (value: string) => {
        sendEvent("click", "title", `Click on product ${value}`);
        onClickSugestions && onClickSugestions(value);
    };

    const elements = limit ? items.slice(0, limit) : items;

    return (
        <>
            <ul>
                {elements.map((i, k) => (
                    <li
                        className="ais-RefinementList-item w-full text-slate-600 font-medim flex flex-col gap-2 p-2 hover:bg-slate-100"
                        key={`srch-${k}`}
                    >
                        <label className="ais-RefinementList-label text-xs grid grid-cols-[auto_20px] gap-2 hover:underline cursor-pointer">
                            <input
                                className="ais-RefinementList-checkbox w-5 h-5 hidden"
                                type="checkbox"
                                value={i.value}
                            />
                            <span
                                className="ais-RefinementList-labelText"
                                onClick={() => handleCreateUrl(i.value)}
                            >
                                {i.value}
                            </span>
                            <span className="w-5 h-full hover:text-slate-900 text-[10px] text-slate-400 rounded-full flex items-center justify-center font-bold">
                                <ArrowTopRight size={20} />
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
}
