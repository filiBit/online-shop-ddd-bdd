// @ts-nocheck

import productData from "../../../../data/product_data.json";
import { Product } from "./product";

describe("Given `id` of `undefined`", () => {
    describe("When the `Product` aggregate attempts to instantiate", () => {
        test("Then an error is thrown", () => {
            expect(() => new Product({ ...productData[0], id: undefined }))
                .toThrow();
        });
    });
});

describe("Given `id` of `null`", () => {
    describe("When the `Product` aggregate attempts to instantiate", () => {
        test("Then an error is thrown", () => {
            expect(() => new Product({ ...productData[0], id: null }))
                .toThrow();
        });
    });
});

describe("Given `id` of `NaN`", () => {
    describe("When the `Product` aggregate attempts to instantiate", () => {
        test("Then an error is thrown", () => {
            expect(() => new Product({ ...productData[0], id: NaN }))
                .toThrow();
        });
    });
});

describe("Given `id` of string type", () => {
    describe("When the `Product` aggregate attempts to instantiate", () => {
        test("Then an error is thrown", () => {
            expect(() => new Product({ ...productData[0], id: "abc" }))
                .toThrow();
        });
    });
});
