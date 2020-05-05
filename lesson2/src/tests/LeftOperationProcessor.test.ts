import { LeftOperationProcessor } from "../main/LeftOperationProcessor";
import { ExtractedOperation } from "../main/ExtractedOperation";
import { operations } from "../main/operations";

const processor: LeftOperationProcessor = new LeftOperationProcessor();

describe("LeftOperationProcessor extractOperation method", () => {
  let result: ExtractedOperation;
  beforeEach(() => {
    result = { operation: operations.UNSUPPORTED_OPERATION, arguments: [] };
  });

  it("Find Operation -6", () => {
    const found: boolean = processor.isOperationExtracted("-6", result);
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.SUBTRACTION,
      arguments: ["6"],
    });
  });
  it("Find Operation -10**", () => {
    const found: boolean = processor.isOperationExtracted("-10**", result);
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.SUBTRACTION,
      arguments: ["10**"],
    });
  });
  it("Find Operation -(5 + 6)!", () => {
    const found: boolean = processor.isOperationExtracted("-(5 + 6)!", result);
    expect(found).toEqual(true);
    expect(result).toEqual({
      operation: operations.SUBTRACTION,
      arguments: ["(5 + 6)!"],
    });
  });
  it("Find Operation (5 + 6)", () => {
    const found: boolean = processor.isOperationExtracted("(5 + 6)", result);
    expect(found).toEqual(false);
  });
});

describe("LeftOperationProcessor performOperation method", () => {
  it("Find -6", () => {
    expect(processor.performOperation(operations.SUBTRACTION, [6])).toEqual(-6);
  });
  it("Find -36", () => {
    expect(processor.performOperation(operations.SUBTRACTION, [36])).toEqual(
      -36
    );
  });
});
