import { API } from "./api";
import productData from "../data/product_data.json";
import { ListResponse } from "@/context/shared/domain/value-object/list-response";

export class ProductCategoryAPI implements API<string> {
    async list(): Promise<ListResponse<string>> {
        const categories = new Set(productData.map((p) => p.category));

        return { data: Array.from(categories), total: categories.size };
    }
}
