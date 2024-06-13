import { FilterChangeProps } from "@/components/pageSearch/Filter";

interface generateFilterProps {
    filters: FilterChangeProps[];
}

interface productMetafieldObject {
    productMetafield: {
        namespace: string;
        key: string;
        value: string;
    };
}

export function generateFilter({ filters }: generateFilterProps) {
    let metafield = "[";

    let compares = "";

    for (const filter of filters) {
        compares += `
            field_${filter.type}: metafield(namespace: "custom", key: "${filter.type}") {
                reference {
                  ... on Metaobject {
                    field(key: "${filter.key}") {
                      value
                    }
                  }
                }
                value
              }
        `;

        metafield += `{productMetafield: {namespace: "custom", key: "${filter.type}", value: "${filter.value}"}},`;
    }

    metafield += "]";

    return { metafield, compares };
}
