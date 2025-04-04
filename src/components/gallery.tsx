"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
    imageSrcs: string[];
}

export function Gallery({ imageSrcs }: Props) {
    const [activeSrc, setActiveSrc] = useState<string>(imageSrcs[0]);
    return (
        <div className="flex flex-col justify-start xl:flex-row">
            <div className="w-[100%] border-b xl:border-r xl:border-b-0">
                <Image
                    src={activeSrc}
                    width={1600}
                    height={2136}
                    alt="Focused product image"
                    className="object-contain-contain mx-auto h-[100%] w-auto"
                />
            </div>
            <div className="flex h-[100px] w-[100%] flex-wrap xl:h-[100%] xl:w-[100px] xl:flex-col">
                {imageSrcs.map((src, i) => (
                    <Image
                        key={src}
                        src={src}
                        width={1600}
                        height={2136}
                        className={`h-[100%] max-w-[25%] cursor-pointer bg-white object-contain hover:brightness-90 xl:max-h-[25%] xl:w-[100%] xl:max-w-[100%] ${
                            src === activeSrc ? "brightness-[95%]" : ""
                        }`}
                        alt={`Product image ${i}`}
                        onClick={() => {
                            setActiveSrc(src);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
