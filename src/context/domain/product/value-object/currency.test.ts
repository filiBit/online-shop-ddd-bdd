// @ts-nocheck
import { Currency } from "./currency";

describe("Given invalid currency", () => {
    describe("When the Currency class attempts to instantiate with an incorrect string", () => {
        test("Then an error is thrown", () => {
            expect(() => new Currency("adf")).toThrow();
        });
    });

    describe("When the Currency class attempts to instantiate with an undefined", () => {
        test("Then an error is thrown", () => {
            expect(() => new Currency()).toThrow();
        });
    });
});
