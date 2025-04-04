import { createContainer } from "@/config/container";
import { FilterSet } from "@/context/shared/domain/aggregate/filter-set";
import { Filter } from "@/context/shared/domain/value-object/filter";
import { Pagination } from "@/context/shared/domain/value-object/pagination";
import { SortOption } from "@/context/shared/domain/value-object/sort-option";
import Link from "next/link";

interface Props {
    pagination: Pagination;
    filterSet: FilterSet;
    sort?: SortOption;
}

export async function SearchOptions({ pagination, filterSet, sort }: Props) {
    const { productService } = createContainer();

    const { data: categories } = await productService.getAllCategories();

    return (
        <div className="sticky top-[16px] flex w-[100%] flex-col gap-[16px] rounded-sm border bg-white p-[16px] select-none">
            <div>
                <span className="mb-[8px] block text-lg">Sort by price</span>
                <div className="flex items-center gap-[8px]">
                    <Link
                        href={`/?${productService.makeQuerySegment2({
                            pagination,
                            filterSet,
                            sort: new SortOption("sale_price", "asc"),
                        })}`}
                        className={`block flex h-[32px] items-center justify-center rounded-sm border bg-neutral-100 px-[8px] text-sm hover:brightness-90 ${
                            sort?.order === "asc"
                                ? "border-sky-800 bg-sky-800 text-white"
                                : ""
                        }`}
                    >
                        Lowest first
                    </Link>
                    <Link
                        href={`/?${productService.makeQuerySegment2({
                            pagination,
                            filterSet,
                            sort: new SortOption("sale_price", "desc"),
                        })}`}
                        className={`block flex h-[32px] items-center justify-center rounded-sm border bg-neutral-100 px-[8px] text-sm hover:brightness-90 ${
                            sort?.order === "desc"
                                ? "border-sky-800 bg-sky-800 text-white"
                                : ""
                        }`}
                    >
                        Highest first
                    </Link>
                    {sort && (
                        <Link
                            href={`/?${productService.makeQuerySegment2({
                                pagination,
                                filterSet,
                            })}`}
                            className={`block flex h-[32px] items-center justify-center rounded-sm border bg-neutral-100 px-[8px] hover:brightness-90`}
                        >
                            Clear
                        </Link>
                    )}
                </div>
            </div>
            <div>
                <span className="mb-[8px] block text-lg">Search</span>
                <form className="flex gap-[8px]">
                    <input
                        name="title"
                        defaultValue={filterSet.getFilter("title")?.value ?? ""}
                        className="border-box flex h-[36px] w-[160px] shrink grow-0 items-center rounded-sm border px-[8px]"
                    ></input>
                    <input
                        hidden
                        name="category"
                        defaultValue={filterSet.getFilter("category")?.value}
                    ></input>
                    <input
                        hidden
                        name="page"
                        defaultValue={pagination.index + 1}
                    ></input>
                    <input
                        hidden
                        name="sort"
                        defaultValue={
                            !sort ? "" : `${sort?.fieldName},${sort?.order}`
                        }
                    ></input>
                    <button
                        type="submit"
                        className="h-40px cursor-pointer rounded-sm border bg-neutral-100 px-[8px] hover:brightness-90"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div>
                <span className="mb-[8px] block text-lg">Categories</span>
                <ul className="flex flex-col items-start gap-[8px]">
                    {categories.map((c) => {
                        const newFilterSet = new FilterSet(filterSet.filters);
                        const newFilter = new Filter("category", c);
                        if (newFilterSet.isFilterExist(newFilter)) {
                            newFilterSet.removeFilter(newFilter.fieldName);
                        } else {
                            newFilterSet.setFilter(newFilter);
                        }
                        return (
                            <Link
                                key={c}
                                href={`/?${productService.makeQuerySegment2({
                                    pagination,
                                    filterSet: newFilterSet,
                                    sort,
                                })}`}
                                className={`h-[32px] content-center rounded-xs px-2 hover:brightness-90 ${
                                    filterSet.getFilter("category")?.value === c
                                        ? "bg-sky-800 text-white"
                                        : "bg-neutral-200"
                                }`}
                            >
                                {c}
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
