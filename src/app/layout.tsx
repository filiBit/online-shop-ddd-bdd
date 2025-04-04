import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} flex w-[100%] flex-col items-center gap-16 p-[16px] pb-20 font-[family-name:var(--font-geist-sans)] antialiased lg:p-[24px]`}
            >
                <header className="flex w-[100%] items-center border-b">
                    <div className="bold px-[16px] text-xl">Store</div>
                    <nav className="flex">
                        <Link
                            href="/"
                            className={`h-[48px] content-center border border-b-0 bg-white px-[16px] hover:brightness-90`}
                        >
                            Home
                        </Link>
                    </nav>
                </header>
                <div className="w-[100%] max-w-[1400px]">{children}</div>
            </body>
        </html>
    );
}
