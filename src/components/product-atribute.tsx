import { ReactNode } from "react";

interface Props {
    children: ReactNode | ReactNode[];
}

export function ProductAttribute({ children }: Props) {
    return <div className="min-w-[160px]">{children}</div>;
}
