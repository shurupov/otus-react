import {Calculator} from "../../src/lesson2/Calculator";

describe("Calculator calculate method", () => {
    it("Addition 4 + 5", () => {
        expect(Calculator.calculate("4 + 5")).toEqual(9);
    });
    it("Multiplication 8 - 6", () => {
        expect(Calculator.calculate("8 - 6")).toEqual(2);
    });
    it("Multiplication 8 * 6", () => {
        expect(Calculator.calculate("8*6")).toEqual(48);
    });
    it("Multiplication 25 / 10", () => {
        expect(Calculator.calculate("   25    /    10")).toEqual(2.5);
    });
    it("Complicated expression 5*6-7/2", () => {
        expect(Calculator.calculate("5*6-7/2")).toEqual(26.5);
    });
    it("Just number 25.001", () => {
        expect(Calculator.calculate("  25.001 ")).toEqual(25.001);
    });
    it("Complicated expression with brackets (10 + 30) / (12 - 4)", () => {
        expect(Calculator.calculate("(10 + 30) / (12 - 4)")).toEqual(5);
    });
    it("Complicated expression with brackets  (3+3)*11+5*(5+5)", () => {
        expect(Calculator.calculate(" (3+3)*11+5*(5+5)")).toEqual(116);
    });
    it("Complicated expression with brackets (6+4)^4", () => {
        expect(Calculator.calculate("(6+4)^4")).toEqual(10000);
    });
});
