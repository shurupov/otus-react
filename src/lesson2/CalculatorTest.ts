import Calculator from "./Calculator";

describe("extractOperation", () => {
    it("1 + 5", () => {
        expect(Calculator.calculate("1 + 5")).toEqual(["+", "3", "4"]);
    });
});