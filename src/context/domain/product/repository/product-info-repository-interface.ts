import { Pagination } from "@/context/shared/domain/value-object/pagination";
import { SortOption } from "@/context/shared/domain/value-object/sort-option";
import { ListResponse } from "@/context/shared/domain/value-object/list-response";
import { Product } from "../aggregate/product";
import { FilterSet } from "@/context/shared/domain/aggregate/filter-set";

export interface ListParameters {
    filterSet?: FilterSet;
    sort?: SortOption;
    pagination: Pagination;
}

export interface ProductRepositoryInterface {
    getProducts(
        listParameters: ListParameters,
    ): Promise<ListResponse<Product>>;
    getProduct(id: number): Promise<Product | null>;
    getCategories(): Promise<ListResponse<string>>;
}
