import { Product } from "@/context/domain/product/aggregate/product";
import Image from "next/image";

interface Props {
    product: Product;
    isPreview?: boolean;
}

export function ProductCard({ product, isPreview }: Props) {
    return (
        <div
            className="group flex h-[320px] shrink cursor-pointer flex-col justify-between gap-[16px] rounded-sm border p-[16px] select-none hover:scale-[1.02] hover:shadow-md"
            title={product.title}
        >
            <div role="figure" className="flex h-[100%] items-center">
                <Image
                    draggable={false}
                    src={product.imageSrcs[0]}
                    width={1600}
                    height={2136}
                    className={`${
                        product.imageSrcs[1] ? "group-hover:hidden" : ""
                    } max-h-[200px] w-[100%] object-contain`}
                    alt={product.title}
                />
                {product.imageSrcs[1] && (
                    <Image
                        draggable={false}
                        src={product.imageSrcs[1]}
                        width={1600}
                        height={2136}
                        className="invisible absolute max-h-[200px] w-0 object-contain group-hover:visible group-hover:static group-hover:w-[100%]"
                        alt={product.title}
                    />
                )}
            </div>
            <div className="flex flex-col gap-[16px]">
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.title}
                </span>
                <div className="flex justify-end gap-[16px] text-sm tracking-wide">
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
                            {product.displaySalePrice || product.displayPrice}
                        </span>
                    )}
                </div>
                {!isPreview && <p>{product.description}</p>}
            </div>
        </div>
    );
}
