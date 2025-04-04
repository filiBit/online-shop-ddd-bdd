import { Currency } from "../value-object/currency";

export class Product {
    id: number;
    title: string;
    description: string;
    imageSrcs: string[];
    /** In cents */
    price: number;
    /** In cents */
    salePrice: number;
    category: string;
    currency: Currency;
    brand: string;
    gender: string;
    material: string;
    collection: string;
    sizes: string;
    sizeFormat: string;
    condition: string;

    constructor(data: Omit<Product, "displayPrice" | "displaySalePrice">) {
        if (typeof data.id !== "number" || Number.isNaN(data.id)) {
            throw new Error("Product: Invalid `id`");
        }

        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.imageSrcs = data.imageSrcs;
        this.price = data.price;
        this.salePrice = data.salePrice;
        this.category = data.category;
        this.currency = data.currency;
        this.brand = data.brand;
        this.gender = data.gender;
        this.material = data.material;
        this.collection = data.collection;
        this.sizes = data.sizes;
        this.sizeFormat = data.sizeFormat;
        this.condition = data.condition;
    }

    get displayPrice() {
        return `${this.currency.currencySymbol}${
            (this.price / 100).toLocaleString("en-US", {
                minimumFractionDigits: 2,
            })
        }`;
    }

    get displaySalePrice() {
        return `${this.currency.currencySymbol}${
            (this.salePrice / 100).toLocaleString("en-US", {
                minimumFractionDigits: 2,
            })
        }`;
    }
}
