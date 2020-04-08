import Calculator from "../../src/lesson2/Calculator";

describe("extractOperation", () => {
    it("1 + 5", () => {
        expect(Calculator.calculate("1 + 5")).toEqual(6);
    });
});