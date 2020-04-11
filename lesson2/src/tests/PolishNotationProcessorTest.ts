import {PolishNotationProcessor} from "../main/PolishNotationProcessor";

const processor: PolishNotationProcessor = new PolishNotationProcessor();

describe("PolishNotationProcessor calc method", () => {
    it("Find Operation 4 5 +", () => {
        expect(processor.calcExpression("4 5 +")).toEqual(9);
    });
    it("Find Operation 10 2 / 5 +", () => {
        expect(processor.calcExpression("4 5 +")).toEqual(9);
    });
    it("Find Operation 10 2 / 5 6 * +", () => {
        expect(processor.calcExpression("10 2 / 5 6 * +")).toEqual(35);
    });
});