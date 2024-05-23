import { client } from "@/agnolia";
import { Autocomplete } from "./AutoComplete";
import { useMemo } from "react";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

export function AutocompleteItem() {
    const getQuerySugestionsPlugin = useMemo(() => {
        return createQuerySuggestionsPlugin({
            searchClient: client,
            indexName: "shopify_products",
            transformSource({ source, onTapAhead }) {
                return {
                    ...source,
                    getItemUrl({ item }) {
                        return `/search/query=${item.query}`;
                    },
                    templates: {
                        ...source.templates,
                        item({ item, components }) {
                            return JSON.stringify(item);
                        },
                    },
                };
            },
        });
    }, []);

    <Autocomplete
        searchClient={client}
        openOnFocus={true}
        placeholder="Buscar produtos"
        detachedMediaQuery="(max-width: 1024px;)"
        classNames={{
            form: "relative rounded-md shadow-sm flex-1",
            inputWrapperPrefix:
                "absolute inset-y-0 left-0 flex items-center pl-3",
            inputWrapperSuffix:
                "absolute inset-y-0 right-0 flex items-center pr-2",
            label: "flex items-center",
            submitButton: "h-5 w-5 text-gray-400",
            clearButton: "h-5 w-5 text-gray-400",
            input: "block w-full rounded-md border-gray-300 pl-10",
            panel: "flex-1 lg:flex-none lg:absolute lg:mt-2 lg:py-1 z-10",
            detachedSearchButton: "p-2 text-gray-400 hover:text-gray-500",
            detachedSearchButtonPlaceholder: "sr-only",
            detachedSearchButtonIcon:
                "w-6 h-6 flex items-center justify-center",
            detachedContainer:
                "fixed inset-0 flex flex-col divide-y divide-gray-500/50",
            detachedCancelButton:
                "bg-white px-2 ml-2 text-gray-500 hover:text-gray-600 transition-all",
        }}
        className="lg:w-4/6"
        plugins={[getQuerySugestionsPlugin]}
    />;
}
