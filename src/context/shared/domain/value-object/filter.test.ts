// @ts-nocheck
import { Filter } from "./filter";

describe("Given invalid `fieldName`", () => {
    describe("When the `Filter` class attempts to instantiate with `undefined`", () => {
        test("Then an error is thrown", () => {
            expect(() => new Filter(undefined, "clothing")).toThrow();
        });
    });

    describe("When the `Filter` class attempts to instantiate with `null`", () => {
        test("Then an error is thrown", () => {
            expect(() => new Filter(null, "clothing")).toThrow();
        });
    });

    describe("When the `Filter` class attempts to instantiate with `34`", () => {
        test("Then an error is thrown", () => {
            expect(() => new Filter(34, "clothing")).toThrow();
        });
    });
});

describe("Given invalid `value`", () => {
    describe("When the `Filter` class attempts to instantiate with `undefined`", () => {
        test("Then an error is thrown", () => {
            expect(() => new Filter("category", undefined)).toThrow();
        });
    });

    describe("When the `Filter` class attempts to instantiate with `null`", () => {
        test("Then an error is thrown", () => {
            expect(() => new Filter("category", null)).toThrow();
        });
    });

    describe("When the `Filter` class attempts to instantiate with `34`", () => {
        test("Then an error is thrown", () => {
            expect(() => new Filter("category", 34)).toThrow();
        });
    });

    describe('When the `Filter` class attempts to instantiate with `""`', () => {
        test("Then an error is thrown", () => {
            expect(() => new Filter("category", "")).toThrow();
        });
    });
});

describe("Given correct arguments", () => {
    describe('When the `Filter` class attempts to instantiate with `fieldName` of "title"', () => {
        test('Then an instance is created with provided value and `operator` "contains"', () => {
            expect(new Filter("title", "faf")).toEqual({
                _fieldName: "title",
                _value: "faf",
                _operator: "contains",
            });
        });
    });
    describe('When the `Filter` class attempts to instantiate with `fieldName` of "category"', () => {
        test('Then an instance is created with provided value and `operator` "exact"', () => {
            expect(new Filter("category", "dsfg")).toEqual({
                _fieldName: "category",
                _value: "dsfg",
                _operator: "exact",
            });
        });
    });
});

describe("Given the `Filter` instance", () => {
    describe("When the method `toQueryString` is invoked", () => {
        test("Then the return value is correct", () => {
            expect(new Filter("title", "faf").toQueryString()).toEqual(
                "title=faf",
            );
        });
    });

    describe("When the method `isStatisfy` is invoked with a segment of a targeted value", () => {
        test("Then it returns true", () => {
            expect(
                new Filter("title", "trou").isStatisfy({ title: "trousers" }),
            )
                .toEqual(
                    true,
                );
        });
        describe("When the method `isStatisfy` is invoked with the exact value of target", () => {
            expect(
                new Filter("title", "trousers").isStatisfy({
                    title: "trousers",
                }),
            )
                .toEqual(
                    true,
                );
        });
    });
    describe("When the method `isStatisfy` is invoked", () => {
        test("Then the logic is case insensitive", () => {
            expect(
                new Filter("title", "trousers").isStatisfy({
                    title: "Trousers",
                }),
            )
                .toEqual(
                    true,
                );
        });
    });
    describe('When the method `isStatisfy` is invoked with `fieldName` of "category"', () => {
        test("Then it returns true when the match is exact", () => {
            expect(
                new Filter("category", "dsfg").isStatisfy({ category: "dsfg" }),
            ).toEqual(
                true,
            );
        });
        test("Then it returns false when the match is partial", () => {
            expect(
                new Filter("category", "ds").isStatisfy({ category: "dsfg" }),
            ).toEqual(
                false,
            );
        });
    });
});
