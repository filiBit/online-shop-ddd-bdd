import Link from "next/link";
import { ProductCard } from "./product-card";
import { Product } from "@/context/domain/product/aggregate/product";

interface Props {
    products: Product[];
}

export function ProductList({ products }: Props) {
    return (
        <div className="flex flex-wrap gap-[16px]">
            {products.map((p) => (
                <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="block w-[14%] min-w-[200px] shrink grow"
                >
                    <ProductCard product={p} isPreview />
                </Link>
            ))}
        </div>
    );
}
