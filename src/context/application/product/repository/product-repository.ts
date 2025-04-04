import { ProductCategoryAPI } from "@/api/category-api";
import { ProductAPI } from "@/api/product-api";
import { Product } from "@/context/domain/product/aggregate/product";
import {
    ListParameters,
    ProductRepositoryInterface,
} from "@/context/domain/product/repository/product-info-repository-interface";
import {
    Currency,
    CurrencyEnum,
} from "@/context/domain/product/value-object/currency";
import { ListResponse } from "@/context/shared/domain/value-object/list-response";

export class ProductRepository implements ProductRepositoryInterface {
    constructor(
        private productApi: ProductAPI,
        private productCategoryAPI: ProductCategoryAPI,
    ) {}

    getProducts(
        listParameters?: ListParameters,
    ): Promise<ListResponse<Product>> {
        return this.productApi.list(listParameters).then((r) => ({
            total: r.total,
            data: r.data.map((dbProduct) =>
                new Product({
                    id: dbProduct.id,
                    title: dbProduct.title,
                    imageSrcs: [
                        dbProduct.image_link,
                        dbProduct.additional_image_link,
                        dbProduct.additional_image_link_2,
                        dbProduct.additional_image_link_3,
                        dbProduct.additional_image_link_4,
                    ].filter((src) => !!src),
                    price: Number(dbProduct.list_price.split(" ")[0]) * 100,
                    salePrice: Number(dbProduct.sale_price.split(" ")[0]) * 100,
                    currency: new Currency(CurrencyEnum.USD),
                    description: dbProduct.description,
                    category: dbProduct.category,
                    brand: dbProduct.brand,
                    gender: dbProduct.gender,
                    material: dbProduct.material,
                    collection: dbProduct.collection,
                    sizes: dbProduct.sizes,
                    sizeFormat: dbProduct.size_format,
                    condition: dbProduct.condition,
                })
            ),
        }));
    }

    getProduct(id: number): Promise<Product | null> {
        return this.productApi.get(id).then((dbProduct) => {
            if (!dbProduct) return null;

            return new Product({
                id: dbProduct.id,
                title: dbProduct.title,
                imageSrcs: [
                    dbProduct.image_link,
                    dbProduct.additional_image_link,
                    dbProduct.additional_image_link_2,
                    dbProduct.additional_image_link_3,
                    dbProduct.additional_image_link_4,
                ].filter((src) => !!src),
                price: Number(dbProduct.list_price.split(" ")[0]),
                salePrice: Number(dbProduct.sale_price.split(" ")[0]),
                currency: new Currency(CurrencyEnum.USD),
                description: dbProduct.description,
                category: dbProduct.category,
                brand: dbProduct.brand,
                gender: dbProduct.gender,
                material: dbProduct.material,
                collection: dbProduct.collection,
                sizes: dbProduct.sizes,
                sizeFormat: dbProduct.size_format,
                condition: dbProduct.condition,
            });
        });
    }

    getCategories(): Promise<ListResponse<string>> {
        return this.productCategoryAPI.list();
    }
}
