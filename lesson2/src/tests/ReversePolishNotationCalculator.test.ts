import { ReversePolishNotationCalculator } from "../main/ReversePolishNotationCalculator";

const processor: ReversePolishNotationCalculator = new ReversePolishNotationCalculator();

describe("PolishNotationProcessor calcExpression method", () => {
  it("Calculate 4 5 +", () => {
    expect(processor.calcExpression("4 5 +")).toEqual(9);
  });
  it("Calculate 10 2 / 5 +", () => {
    expect(processor.calcExpression("10 2 / 5 +")).toEqual(10);
  });
  it("Calculate 10 2 / 5 6 * +", () => {
    expect(processor.calcExpression("10 2 / 5 6 * +")).toEqual(35);
  });
  it("Calculate 10 2 / -5 6 * +", () => {
    expect(processor.calcExpression("10 2 / -5 6 * +")).toEqual(-25);
  });
  it("Calculate 6 !", () => {
    expect(processor.calcExpression("6 !")).toEqual(2 * 3 * 4 * 5 * 6);
  });
  it("Calculate 30 sin 2 * 2 +", () => {
    expect(processor.calcExpression("30 sin 2 * 2 +")).toEqual(3);
  });
  it("Calculate 45 tg 1 + 2 ^", () => {
    expect(processor.calcExpression("45 tg 1 + 2 ^")).toEqual(4);
  });
});
