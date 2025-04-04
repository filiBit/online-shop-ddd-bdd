import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[200px] content-center text-center">
            The product does not exist.
            <br />
            <Link href="/" className="text-blue-500">
                Go to Home page
            </Link>
        </div>
    );
}
