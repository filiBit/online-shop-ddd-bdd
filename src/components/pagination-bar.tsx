import { Pagination } from "@/context/shared/domain/value-object/pagination";
import Link from "next/link";
import { useMemo } from "react";

interface PageButton {
    id: string;
    type: "page" | "collapse";
    value?: number;
}

function makePageButtons(page: number, total: number): PageButton[] {
    if (total < 6) {
        return Array.from(new Array(total)).map((_, index) => ({
            id: `a_${index}`,
            type: "page",
            value: index + 1,
        }));
    }

    if (page < 5) {
        return [
            { id: "b_1", type: "page", value: 1 },
            { id: "b_2", type: "page", value: 2 },
            { id: "b_3", type: "page", value: 3 },
            { id: "b_4", type: "page", value: 4 },
            { id: "b_5", type: "page", value: 5 },
            { id: "b_6", type: "collapse" },
            { id: "b_7", type: "page", value: total },
        ];
    }
    if (total - page < 4) {
        return [
            { id: "c_1", type: "page", value: 1 },
            { id: "c_2", type: "collapse" },
            { id: "c_3", type: "page", value: total - 4 },
            { id: "c_4", type: "page", value: total - 3 },
            { id: "c_5", type: "page", value: total - 2 },
            { id: "c_6", type: "page", value: total - 1 },
            { id: "c_7", type: "page", value: total },
        ];
    }

    return [
        { id: "d_1", type: "page", value: 1 },
        { id: "d_2", type: "collapse" },
        { id: "d_3", type: "page", value: page - 1 },
        { id: "d_4", type: "page", value: page },
        { id: "d_5", type: "page", value: page + 1 },
        { id: "d_6", type: "collapse" },
        { id: "d_7", type: "page", value: total },
    ];
}

export function PaginationBar({
    pagination,
    totalItemCount,
}: {
    pagination: Pagination;
    totalItemCount: number;
    setPagination: (pagination: Pagination) => void;
    className?: string;
}) {
    const totalPages = Math.ceil(totalItemCount / pagination.size);
    const pages = useMemo(
        () => makePageButtons(pagination.index + 1, totalPages),
        [pagination.index, totalPages],
    );

    return (
        <div className="flex">
            <Link
                href={
                    pagination.index > 1 ? `/?page=${pagination.index - 1}` : ""
                }
                className={`h-[40px]hover:bg-neutral-100 flex w-[40px] cursor-pointer items-center justify-center rounded-tl-sm rounded-bl-sm border border-r-0 border-neutral-700 text-neutral-700`}
            >
                &lt;
            </Link>
            {pages.map((x) => (
                <Link
                    key={x.id}
                    href={x.value === undefined ? "" : `?page=${x.value}`}
                    className={`flex h-[40px] w-[40px] items-center justify-center border border-r-0 border-neutral-700 text-neutral-700 ${
                        x.value === pagination.index + 1
                            ? "bg-sky-100 text-sky-800 hover:bg-sky-200"
                            : "hover:bg-neutral-100"
                    } ${x.type === "collapse" ? "hidden md:flex" : ""}`}
                >
                    {x.value ?? "..."}
                </Link>
            ))}
            <Link
                href={`/?page=${
                    pagination.index + 1 < totalPages
                        ? pagination.index + 2
                        : pagination.index + 1
                }`}
                className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-tr-sm rounded-br-sm border border-neutral-700 text-neutral-700 hover:bg-neutral-100`}
            >
                &gt;
            </Link>
        </div>
    );
}
