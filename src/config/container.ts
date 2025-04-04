import { ProductCategoryAPI } from "@/api/category-api";
import { ProductAPI } from "@/api/product-api";
import { ProductService } from "@/context/application/product/service/product-service";
import { ProductRepository } from "@/context/application/product/repository/product-repository";

export function createContainer(): { productService: ProductService } {
    const productApi = new ProductAPI();
    const productCategoryAPI = new ProductCategoryAPI();
    const productRepository = new ProductRepository(
        productApi,
        productCategoryAPI,
    );
    const productService = new ProductService(productRepository);

    return { productService };
}
