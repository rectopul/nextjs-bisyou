"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const removeDuplicates = <T, K extends keyof T>(
    locations: T[],
    key: K
): T[] => {
    const uniqueLocations: T[] = [];
    const valueSet = new Set<T[K]>();

    locations.forEach((location) => {
        if (!valueSet.has(location[key])) {
            valueSet.add(location[key]);
            uniqueLocations.push(location);
        }
    });

    return uniqueLocations;
};

export interface FiltersAddressType {
    type: "state" | "city";
    value: string;
}

export interface CitiValue {
    city: string;
}
export interface StateValue {
    state: string;
}

interface FindFiltersProps {
    cities: CitiValue[];
    states: StateValue[];
    onSelect: (data: FiltersAddressType) => void;
}

export function FindFilters({ cities, states, onSelect }: FindFiltersProps) {
    const iniqueCities = removeDuplicates(cities, "city");
    const iniqueStates = removeDuplicates(states, "state");

    const handleSelect = (data: FiltersAddressType) => {
        onSelect(data);
    };

    return (
        <>
            <div className="w-full flex flex-col gap-7">
                <Select
                    onValueChange={(value) =>
                        handleSelect({ type: "state", value })
                    }
                >
                    <SelectTrigger className="bg-bisyou-yellow border-none text-bisyou-font rounded-full font-medium">
                        <SelectValue
                            placeholder="Estado"
                            className="text-bisyou-font"
                        />
                    </SelectTrigger>
                    <SelectContent className="text-bisyou-font border-none shadow-none">
                        {iniqueStates &&
                            iniqueStates.map((s, k) => (
                                <SelectItem
                                    value={s.state}
                                    key={`filter-state-${k}`}
                                    className="rounded-full hover:bg-bisyou-yellow font-medium text-bisyou-font"
                                >
                                    {s.state}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value) =>
                        handleSelect({ type: "city", value })
                    }
                >
                    <SelectTrigger className="bg-bisyou-yellow border-none text-bisyou-font rounded-full font-medium">
                        <SelectValue
                            placeholder="Cidade"
                            className="text-bisyou-font"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {iniqueCities &&
                            iniqueCities.map((c, k) => (
                                <SelectItem
                                    value={c.city}
                                    key={`filter-city-${k}`}
                                >
                                    {c.city}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
}
