import { API } from "./api";
import productData from "../data/product_data.json";
import { Pagination } from "@/context/shared/domain/value-object/pagination";
import { ListResponse } from "@/context/shared/domain/value-object/list-response";
import { ListParameters } from "@/context/domain/product/repository/product-info-repository-interface";

export type DatabaseProduct = {
    id: number;
    title: string;
    description: string;
    image_link: string;
    additional_image_link: string;
    availability: string;
    list_price: string;
    sale_price: string;
    gtin: string;
    product_type: string;
    brand: string;
    condition: string;
    raw_color: string;
    color: string;
    gender: string;
    size_format: string;
    sizing_schema: string;
    sizes: string;
    size_type: string;
    item_group_id: number;
    category: string;
    shipping: string;
    mpn: string;
    material: string;
    collection: string;
    additional_image_link_2: string;
    additional_image_link_3: string;
    additional_image_link_4: string;
};

export class ProductAPI implements API<DatabaseProduct> {
    async list(
        { filterSet, sort, pagination = new Pagination() }: ListParameters = {
            pagination: new Pagination(),
        },
    ): Promise<ListResponse<DatabaseProduct>> {
        let data = productData as DatabaseProduct[];

        if (filterSet) {
            data = data.filter((row) =>
                filterSet.filters.every((f) => f.isStatisfy(row))
            );
        }

        if (sort) {
            data = data.sort((a, b) => {
                const valueA = a[sort.fieldName as keyof DatabaseProduct];
                const parsedA = sort.fieldName.includes("price")
                    ? Number((valueA as string).split(" ")[0])
                    : valueA;

                const valueB = b[sort.fieldName as keyof DatabaseProduct];
                const parsedB = sort.fieldName.includes("price")
                    ? Number((valueB as string).split(" ")[0])
                    : valueB;

                if (parsedA < parsedB) {
                    return sort.order === "asc" ? -1 : 1;
                }
                if (parsedA > parsedB) {
                    return sort.order === "asc" ? 1 : -1;
                }

                return 0;
            });
        }

        return {
            data: data.slice(
                pagination.index * pagination.size,
                (pagination.index + 1) * pagination.size,
            ),
            total: data.length,
        };
    }

    async get(id: number): Promise<DatabaseProduct | null> {
        return productData.find((row) => row.id === id) || null;
    }
}
