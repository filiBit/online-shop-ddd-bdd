import { ListResponse } from "@/context/shared/domain/value-object/list-response";
import { ListParameters } from "@/context/domain/product/repository/product-info-repository-interface";

export interface API<T> {
    list(listParameters: ListParameters): Promise<ListResponse<T>>;
    get?: (id: number) => Promise<T | null>;
}
