import { PaginationBar } from "@/components/pagination-bar";
import { ProductList } from "@/components/product-list";
import { SearchOptions } from "@/components/search-options";
import { createContainer } from "@/config/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your favorite store",
    description:
        "Shop best quality products: from clothing to home decor and other categories",
    keywords: [
        "quality",
        "products",
        "clothing",
        "shoes",
        "jewelry",
        "bags",
        "accessories",
        "sale",
    ],
};

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { productService } = createContainer();

    const { pagination, filterSet, sort } = productService.mapSearchParams(
        await searchParams,
    );

    const { data: products, total } = await productService.getProducts({
        pagination,
        filterSet,
        sort,
    });

    return (
        <main className="flex flex-col items-center items-stretch gap-[32px]">
            <div className="flex flex-wrap justify-between gap-[32px] xl:justify-end">
                <details className="static rounded-sm open:w-[100%] xl:hidden">
                    <summary
                        className={`h-[40px] w-fit cursor-pointer content-center items-center justify-center rounded-sm border px-[8px] select-none ${
                            !filterSet.isEmpty || !!sort
                                ? "bg-sky-800 text-white"
                                : ""
                        }`}
                    >
                        Filter & sort
                    </summary>
                    <div>
                        <div className="right-0 left-0 z-1 mx-auto mt-[16px] w-[100%] shrink-0 text-black">
                            <SearchOptions
                                pagination={pagination}
                                filterSet={filterSet}
                                sort={sort}
                            />
                        </div>
                    </div>
                </details>
                <PaginationBar
                    pagination={pagination}
                    filterSet={filterSet}
                    sort={sort}
                    totalItemCount={total}
                />
            </div>
            <div className="flex items-stretch gap-[32px]">
                <div className="h-100% relative hidden w-[320px] shrink-0 xl:block">
                    <SearchOptions
                        pagination={pagination}
                        filterSet={filterSet}
                        sort={sort}
                    />
                </div>
                <ProductList products={products} />
            </div>
            <div className="flex justify-end">
                <PaginationBar
                    pagination={pagination}
                    filterSet={filterSet}
                    sort={sort}
                    totalItemCount={total}
                />
            </div>
        </main>
    );
}
