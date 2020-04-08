import {TwoArgumentsOperationProcessor} from "../../src/lesson2/TwoArgumentsOperationProcessor";
import {Operation} from "../../src/lesson2/Operation";
import {ExtractedOperation} from "../../src/lesson2/ExtractedOperation";

describe("TwoArgumentsOperationProcessor performOperationMethod method", () => {
    it("Addition 4 + 5", () => {
        expect(TwoArgumentsOperationProcessor.performOperation(Operation.ADDITION, [4, 5])).toEqual(9);
    });
    it("Multiplication 8 - 6", () => {
        expect(TwoArgumentsOperationProcessor.performOperation(Operation.SUBTRACTION, [8, 6])).toEqual(2);
    });
    it("Multiplication 8 * 6", () => {
        expect(TwoArgumentsOperationProcessor.performOperation(Operation.MULTIPLICATION, [8, 6])).toEqual(48);
    });
    it("Multiplication 25 / 10", () => {
        expect(TwoArgumentsOperationProcessor.performOperation(Operation.DIVISION, [25, 10])).toEqual(2.5);
    });
    it("Multiplication 3 ^ 4", () => {
        expect(TwoArgumentsOperationProcessor.performOperation(Operation.POWER, [3, 4])).toEqual(81);
    });
});

describe("TwoArgumentsOperationProcessor extractOperation method", () => {
    it("Find Operation 4 + 5", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("4 + 5", result as ExtractedOperation);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.ADDITION, arguments: ["4 ", " 5"]});
    });
    it("Find Operation 4 -5", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("4 -5", result as ExtractedOperation);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.SUBTRACTION, arguments: ["4 ", "5"]});
    });
    it("Find Operation 4* 5", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("4* 5", result as ExtractedOperation);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.MULTIPLICATION, arguments: ["4", " 5"]});
    });
    it("Find Operation 242424", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("242424", result as ExtractedOperation);
        expect(found).toEqual(false);
    });
    it("Find Operation 5*6-7", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("5*6-7", result as ExtractedOperation);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.SUBTRACTION, arguments: ["5*6", "7"]});
    });
    it("Find Operation 5*6-7/2", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("5*6-7/2", result as ExtractedOperation);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.SUBTRACTION, arguments: ["5*6", "7/2"]});
    });
    it("Find the first Operation 6*(42-10)+(22-1)", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("6*(42-10)+(22-1)", result as ExtractedOperation);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.ADDITION, arguments: ["6*(42-10)", "(22-1)"]});
    });
    it("Find the first Operation (49+51) / (32-12)", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = TwoArgumentsOperationProcessor.extractOperation("(49+51) / (32-12)", result as ExtractedOperation);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.DIVISION, arguments: ["(49+51) ", " (32-12)"]});
    });
});
