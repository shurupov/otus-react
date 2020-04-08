import {OneArgumentOperationProcessor,} from "../../src/lesson2/OneArgumentOperationProcessor";
import {ExtractedOperation} from "../../src/lesson2/ExtractedOperation";
import {Operation} from "../../src/lesson2/Operation";

describe("OneArgumentOperationProcessor extractOperation method", () => {
    it("Find Operation 10!", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = OneArgumentOperationProcessor.extractOperation("10!", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.FACTORIAL, arguments: ["10"]});
    });
    it("Find Operation (5 + 6)!", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = OneArgumentOperationProcessor.extractOperation("(5 + 6)!", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.FACTORIAL, arguments: ["(5 + 6)"]});
    });
    it("Find Operation 10", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = OneArgumentOperationProcessor.extractOperation("10", result);
        expect(found).toEqual(false);
    });
    it("Find Operation (5 + 6)", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = OneArgumentOperationProcessor.extractOperation("(5 + 6)", result);
        expect(found).toEqual(false);
    });
});

describe("OneArgumentOperationProcessor performOperation method", () => {
    it("Find 6!", () => {
        expect(OneArgumentOperationProcessor.performOperation(Operation.FACTORIAL, [6])).toEqual(6*5*4*3*2);
    });
});

describe("OneArgumentOperationProcessor factorial method", () => {
    it("Find factorial of 3", () => {
        expect(OneArgumentOperationProcessor.factorial(3)).toEqual(3*2);
    });
    it("Find factorial of 1", () => {
        expect(OneArgumentOperationProcessor.factorial(1)).toEqual(1);
    });
    it("Find factorial of 6", () => {
        expect(OneArgumentOperationProcessor.factorial(6)).toEqual(6*5*4*3*2);
    });
});
