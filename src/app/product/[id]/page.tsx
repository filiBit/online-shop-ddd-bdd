import { notFound } from "next/navigation";
import { createContainer } from "@/config/container";
import { Gallery } from "@/components/gallery";
import { ProductAttribute } from "@/components/product-atribute";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { productService } = createContainer();

    const product = await productService.getProduct(Number(id));

    if (!product) notFound();

    return (
        <main>
            <div className="mb-[32px] flex flex-wrap items-center gap-[16px]">
                <h1 className="text-xl">{product.title}</h1>
                <div className="rounded-sm bg-neutral-200 px-[8px]">
                    {product.category}
                </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-[64px] lg:flex-row-reverse lg:items-start">
                <div className="h-[200%] w-[100%] max-w-[400px] shrink-0 border xl:max-w-[500px]">
                    <Gallery imageSrcs={product.imageSrcs} />
                </div>
                <div className="flex flex-col items-start gap-[32px]">
                    <p>{product.description}</p>
                    <div className="flex flex-wrap justify-between gap-[32px]">
                        <ProductAttribute>
                            Brand: <strong>{product.brand || "-"}</strong>
                        </ProductAttribute>
                        <ProductAttribute>
                            Gender: <strong>{product.gender || "-"}</strong>
                        </ProductAttribute>
                        <ProductAttribute>
                            Condition:{" "}
                            <strong>{product.condition || "-"}</strong>
                        </ProductAttribute>
                        <ProductAttribute>
                            Gender: <strong>{product.gender || "-"}</strong>
                        </ProductAttribute>
                        <ProductAttribute>
                            Sizes: <strong>{product.sizes || "-"}</strong>
                        </ProductAttribute>
                        <ProductAttribute>
                            Size format:{" "}
                            <strong>{product.sizeFormat || "-"}</strong>
                        </ProductAttribute>
                        <ProductAttribute>
                            Material: <strong>{product.material || "-"}</strong>
                        </ProductAttribute>
                        <ProductAttribute>
                            Collection:{" "}
                            <strong>{product.collection || "-"}</strong>
                        </ProductAttribute>
                    </div>
                    <div className="flex w-[100%] justify-end gap-[16px] text-lg tracking-wide">
                        Price:
                        {product.price && product.salePrice ? (
                            <>
                                <span className="text-neutral-500 line-through">
                                    {product.displayPrice}
                                </span>
                                <span className="text-red-700">
                                    {product.displaySalePrice}
                                </span>
                            </>
                        ) : (
                            <span>
                                {product.displaySalePrice ||
                                    product.displayPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
