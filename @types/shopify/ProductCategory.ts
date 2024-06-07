export interface ProductCategoryEdge {
    data: ProductCategoryData;
    extensions: Extensions;
}

export interface ProductCategoryData {
    shop: Shop;
}

export interface Shop {
    allProductCategories: AllProductCategory[];
}

export interface AllProductCategory {
    category: ProductTaxonomyNode;
}

export interface ProductTaxonomyNode {
    fullName: string;
    name: string;
    id: string;
    isLeaf: boolean;
    isRoot: boolean;
}

export interface Extensions {
    cost: Cost;
}

export interface Cost {
    requestedQueryCost: number;
    actualQueryCost: number;
    throttleStatus: ThrottleStatus;
    fields: Field[];
}

export interface ThrottleStatus {
    maximumAvailable: number;
    currentlyAvailable: number;
    restoreRate: number;
}

export interface Field {
    path: string[];
    definedCost: number;
    requestedTotalCost: number;
    requestedChildrenCost?: number;
}
