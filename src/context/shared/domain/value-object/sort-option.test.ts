// @ts-nocheck
import { SortOption } from "./sort-option";

describe("Given no arguments", () => {
    describe("When the `SortOption` class attempts to instantiate", () => {
        test("Then an error is thrown", () => {
            expect(() => new SortOption()).toThrow();
        });
    });
});

describe("Given incorrect arguments", () => {
    describe("When the `SortOption` class attempts to instantiate with `undefined`", () => {
        test("Then an error is thrown", () => {
            expect(() => new SortOption(undefined)).toThrow();
        });
    });
    describe("When the `SortOption` class attempts to instantiate with `string` and `undefined`", () => {
        test("Then an error is thrown", () => {
            expect(() => new SortOption("sale_price", undefined)).toThrow();
        });
    });
    describe("When the `SortOption` class attempts to instantiate with `null` and `undefined`", () => {
        test("Then an error is thrown", () => {
            expect(() => new SortOption(null, null)).toThrow();
        });
    });
    describe('When the `SortOption` class attempts to instantiate with `""` and `undefined`', () => {
        test("Then an error is thrown", () => {
            expect(() => new SortOption("", "")).toThrow();
        });
    });
    describe('When the `SortOption` class attempts to instantiate with string and `"dsfg"`', () => {
        test("Then an error is thrown", () => {
            expect(() => new SortOption("sale_price", "dfsg")).toThrow();
        });
    });
});

describe("Given correct arguments", () => {
    describe('When the `SortOption` class attempts to instantiate in "asc" order', () => {
        test("Then an instance is created with provided value", () => {
            expect(new SortOption("list_price", "asc")).toEqual({
                _fieldName: "list_price",
                _order: "asc",
            });
        });
    });
    describe('When the `SortOption` class attempts to instantiate in "desc" order', () => {
        test("Then an instance is created with provided value", () => {
            expect(new SortOption("list_price", "desc")).toEqual({
                _fieldName: "list_price",
                _order: "desc",
            });
        });
    });
});

describe("Given an instance of `SortOption`", () => {
    describe("When `toQueryString` method is invoked", () => {
        test("Then the method returns the correct segment of a query string", () => {
            expect(new SortOption("sale_price", "asc").toQueryString()).toEqual(
                "sort=sale_price,asc",
            );
        });
    });
});
