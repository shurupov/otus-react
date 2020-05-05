import { TwoArgumentsProcessor } from "../main/TwoArgumentsProcessor";
import { operations } from "../main/operations";
import { ExtractedOperation } from "../main/ExtractedOperation";

const processor: TwoArgumentsProcessor = new TwoArgumentsProcessor();

describe("TwoArgumentsOperationProcessor performOperationMethod method", () => {
  it("Addition 4 + 5", () => {
    expect(processor.performOperation(operations.ADDITION, [4, 5])).toEqual(9);
  });
  it("Multiplication 8 - 6", () => {
    expect(processor.performOperation(operations.SUBTRACTION, [8, 6])).toEqual(
      2
    );
  });
  it("Multiplication 8 * 6", () => {
    expect(
      processor.performOperation(operations.MULTIPLICATION, [8, 6])
    ).toEqual(48);
  });
  it("Multiplication 25 / 10", () => {
    expect(processor.performOperation(operations.DIVISION, [25, 10])).toEqual(
      2.5
    );
  });
  it("Multiplication 3 ^ 4", () => {
    expect(processor.performOperation(operations.POWER, [3, 4])).toEqual(81);
  });
});

describe("TwoArgumentsOperationProcessor extractOperation method", () => {
  let result: ExtractedOperation;
  beforeEach(() => {
    result = { operation: operations.UNSUPPORTED_OPERATION, arguments: [] };
  });

  it("Find Operation 4 + 5", () => {
    const found: boolean = processor.isOperationExtracted(
      "4 + 5",
      result as ExtractedOperation
    );
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.ADDITION,
      arguments: ["4 ", " 5"],
    });
  });
  it("Find Operation 4 -5", () => {
    const found: boolean = processor.isOperationExtracted(
      "4 -5",
      result as ExtractedOperation
    );
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.SUBTRACTION,
      arguments: ["4 ", "5"],
    });
  });
  it("Find Operation 4* 5", () => {
    const found: boolean = processor.isOperationExtracted(
      "4* 5",
      result as ExtractedOperation
    );
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.MULTIPLICATION,
      arguments: ["4", " 5"],
    });
  });
  it("Find Operation 242424", () => {
    const found: boolean = processor.isOperationExtracted(
      "242424",
      result as ExtractedOperation
    );
    expect(found).toEqual(false);
  });
  it("Find Operation 5*6-7", () => {
    const found: boolean = processor.isOperationExtracted(
      "5*6-7",
      result as ExtractedOperation
    );
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.SUBTRACTION,
      arguments: ["5*6", "7"],
    });
  });
  it("Find Operation 5*6-7/2", () => {
    const found: boolean = processor.isOperationExtracted(
      "5*6-7/2",
      result as ExtractedOperation
    );
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.SUBTRACTION,
      arguments: ["5*6", "7/2"],
    });
  });
  it("Find the first Operation 6*(42-10)+(22-1)", () => {
    const found: boolean = processor.isOperationExtracted(
      "6*(42-10)+(22-1)",
      result as ExtractedOperation
    );
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.ADDITION,
      arguments: ["6*(42-10)", "(22-1)"],
    });
  });
  it("Find the first Operation (49+51) / (32-12)", () => {
    const found: boolean = processor.isOperationExtracted(
      "(49+51) / (32-12)",
      result as ExtractedOperation
    );
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.DIVISION,
      arguments: ["(49+51) ", " (32-12)"],
    });
  });
  it("55 ** 11", () => {
    const found: boolean = processor.isOperationExtracted(
      "55 ** 11",
      result as ExtractedOperation
    );
    expect(found).toEqual(false);
  });
});
