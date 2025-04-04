import { Product } from "@/context/domain/product/aggregate/product";
import { ListParameters } from "@/context/domain/product/repository/product-info-repository-interface";
import { ProductRepository } from "@/context/application/product/repository/product-repository";
import { FilterSet } from "@/context/shared/domain/aggregate/filter-set";
import { Filter } from "@/context/shared/domain/value-object/filter";
import { ListResponse } from "@/context/shared/domain/value-object/list-response";
import { Pagination } from "@/context/shared/domain/value-object/pagination";
import { SortOption } from "@/context/shared/domain/value-object/sort-option";

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    mapSearchParams(searchParams: {
        [key: string]: string | string[] | undefined;
    }) {
        console.log("MAPPING");
        console.log(searchParams);
        const { page, title, category, sort } = searchParams;

        const pagination = new Pagination(Number(page) - 1);

        const filterSet: FilterSet = new FilterSet();

        try {
            // @ts-expect-error - Validation done within
            filterSet.setFilter(new Filter("title", title.toLowerCase()));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {}
        try {
            filterSet.setFilter(
                new Filter(
                    "category",
                    // @ts-expect-error - Validation done within
                    category,
                ),
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {}

        let sortOption;
        try {
            console.log("SORT");
            console.log(sort);
            sortOption = new SortOption(
                // @ts-expect-error - Validation done within
                ...sort.split(","),
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
        }
        console.log(filterSet);

        return { pagination, filterSet, sort: sortOption };
    }

    async getProducts(
        { pagination, filterSet, sort }: ListParameters,
    ) {
        return this.productRepository.getProducts({
            pagination,
            filterSet,
            sort,
        });
    }

    async getProduct(id: number): Promise<Product | null> {
        return this.productRepository.getProduct(id);
    }

    async getAllCategories(): Promise<ListResponse<string>> {
        return this.productRepository.getCategories();
    }

    makeQuerySegment({ page, search, category, sort }: {
        page?: string;
        search?: string;
        category?: string;
        sort?: string;
    }): string {
        const params = new URLSearchParams();
        if (!!page) params.append("page", page);
        if (!!search) params.append("search", search);
        if (!!category) params.append("category", encodeURIComponent(category));
        if (!!sort) params.append("sort", sort);
        return params.toString();
    }

    makeQuerySegment2({ pagination, filterSet, sort }: {
        pagination: Pagination;
        filterSet?: FilterSet;
        sort?: SortOption;
    }): string {
        const params = [];
        if (!!pagination) params.push(pagination.toQueryString());
        if (!!filterSet) params.push(filterSet.toQueryString());
        if (!!sort) params.push(sort.toQueryString());

        return params.join("&");
    }
}
