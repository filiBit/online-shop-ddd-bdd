// @ts-nocheck
import { Filter } from "../value-object/filter";
import { FilterSet } from "./filter-set";

describe("Given invalid argument", () => {
    describe("When the `FilterSet` class attempts to instantiate", () => {
        expect(() => new FilterSet([undefined])).toThrow();

        test("Then an error is thrown", () => {
            expect(() => new FilterSet([null])).toThrow();
        });

        test("Then an error is thrown", () => {
            expect(() => new FilterSet([3])).toThrow();
        });
    });
});

describe("Given no arguments", () => {
    describe("When the `FilterSet` class attempts to instantiate", () => {
        test("Then an instance with default values is created", () => {
            expect(new FilterSet()).toEqual({ _filters: new Map() });
        });
    });
});

describe("Given an instance of `FilterSet`", () => {
    describe("When `setFilter` methods is invoked", () => {
        test("Then it can ge retrieved with `getFilter`", () => {
            const filterSet = new FilterSet([]);
            filterSet.setFilter(new Filter("a", "b"));

            expect(filterSet.getFilter("a")).toEqual(new Filter("a", "b"));
        });

        test("Then it can ge retrieved with `getFilter`", () => {
            const filterSet = new FilterSet([new Filter("a", "b")]);
            filterSet.setFilter(new Filter("c", "d"));

            expect(filterSet.getFilter("c")).toEqual(new Filter("c", "d"));
        });

        test("Then other filters can ge retrieved with `getFilter`", () => {
            const filterSet = new FilterSet([new Filter("a", "b")]);
            filterSet.setFilter(new Filter("c", "d"));

            expect(filterSet.getFilter("a")).toEqual(new Filter("a", "b"));
        });
    });
});

describe("Given an instance of `FilterSet`", () => {
    describe("When `setFilter` method is invoked", () => {
        test("Then it overwrites filter with the same `fieldName`", () => {
            const filterSet = new FilterSet([new Filter("a", "b")]);
            filterSet.setFilter(new Filter("a", "d"));

            expect(filterSet.getFilter("a")?.value).toEqual("d");
        });
    });
});

describe("Given an instance of `FilterSet`", () => {
    test("Then `isFilterExist` can confirm whether a filter is stored", () => {
        const filterSet = new FilterSet([]);
        filterSet.setFilter(new Filter("a", "b"));

        expect(filterSet.isFilterExist(new Filter("a", "b"))).toBe(true);
    });

    test("Then `isFilterExist` can confirm whether a filter is stored", () => {
        const filterSet = new FilterSet([new Filter("a", "b")]);

        expect(filterSet.isFilterExist(new Filter("g", "h"))).toBe(false);
    });

    test("Then `isFilterExist` can confirm whether a filter is stored", () => {
        const filterSet = new FilterSet([new Filter("a", "b")]);
        filterSet.setFilter(new Filter("c", "d"));

        expect(filterSet.isFilterExist(new Filter("c", "d"))).toBe(true);
    });

    test("Then `isFilterExist` can confirm whether a filter is stored", () => {
        const filterSet = new FilterSet([new Filter("a", "b")]);
        filterSet.setFilter(new Filter("c", "d"));

        expect(filterSet.isFilterExist(new Filter("a", "b"))).toBe(true);
    });
});

describe("Given an instance of `FilterSet`", () => {
    test("Then `removeFilter` removes the filter", () => {
        const filterSet = new FilterSet([]);
        filterSet.setFilter(new Filter("a", "b"));
        filterSet.removeFilter("a");

        expect(filterSet.isFilterExist(new Filter("a", "b"))).toBe(false);
    });
});

describe("Given an instance of `FilterSet`", () => {
    describe("When `toQueryStrin` is invoked", () => {
        test("Then the return value is correct", () => {
            const filterSet = new FilterSet([
                new Filter("a", "b"),
                new Filter("c", "d"),
            ]);

            expect(filterSet.toQueryString()).toBe("a=b&c=d");
        });
    });
});
