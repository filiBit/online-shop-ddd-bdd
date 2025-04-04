// @ts-nocheck
import { Pagination } from "./pagination";

describe("Given no arguments", () => {
    describe("When the `Pagination` class attempts to instantiate", () => {
        test("Then an instance is created with default (fallback) values", () => {
            expect(new Pagination()).toEqual({ _index: 0, _size: 12 });
        });
    });
});

describe("Given incorrect arguments", () => {
    describe("When the `Pagination` class attempts to instantiate with `NaN` and `NaN`", () => {
        test("Then an instance is created with default (fallback) value", () => {
            expect(new Pagination(NaN, NaN)).toEqual({ _index: 0, _size: 12 });
        });
    });
    describe('When the `Pagination` class attempts to instantiate with `""` and `""`', () => {
        test("Then an instance is created with default (fallback) value", () => {
            expect(new Pagination("", "")).toEqual({ _index: 0, _size: 12 });
        });
    });
    describe('When the `Pagination` class attempts to instantiate with `"Aa"` and `"Bb"`', () => {
        test("Then an instance is created with default (fallback) value", () => {
            expect(new Pagination("Aa", "Bb")).toEqual({
                _index: 0,
                _size: 12,
            });
        });
    });
    describe('When the `Pagination` class attempts to instantiate with `"Aa"` and `undefined`', () => {
        test("Then an instance is created with default (fallback) value", () => {
            expect(new Pagination("Aa")).toEqual({ _index: 0, _size: 12 });
        });
    });
});

describe("Given correct arguments", () => {
    describe("When the `Pagination` class attempts to instantiate", () => {
        test("Then an instance is created with provided values", () => {
            expect(new Pagination(5, 2)).toEqual({ _index: 5, _size: 2 });
        });
    });
});
describe("Given an instance of `Pagination`", () => {
    describe("When `toQueryString` method is invoked", () => {
        test("Then the method returns the correc segment of a query string", () => {
            expect(new Pagination(5, 2).toQueryString()).toEqual(
                "page=6&page_size=2",
            );
        });
    });
});
