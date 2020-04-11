import {LeftOperationProcessor} from "../main/LeftOperationProcessor";
import {ExtractedOperation} from "../main/ExtractedOperation";
import {operations} from "../main/operations";

const processor: LeftOperationProcessor = new LeftOperationProcessor();

describe("LeftOperationProcessor extractOperation method", () => {
    it("Find Operation -6", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("-6", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.SUBTRACTION, arguments: ["6"]});
    });
    it("Find Operation -10**", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("-10**", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.SUBTRACTION, arguments: ["10**"]});
    });
    it("Find Operation -(5 + 6)!", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("-(5 + 6)!", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.SUBTRACTION, arguments: ["(5 + 6)!"]});
    });
    it("Find Operation (5 + 6)", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("(5 + 6)", result);
        expect(found).toEqual(false);
    });
});

describe("LeftOperationProcessor performOperation method", () => {
    it("Find -6", () => {
        expect(processor.performOperation(operations.SUBTRACTION, [6])).toEqual(-6);
    });
    it("Find -36", () => {
        expect(processor.performOperation(operations.SUBTRACTION, [36])).toEqual(-36);
    });
});
