import {RightOperationProcessor,} from "../main/RightOperationProcessor";
import {ExtractedOperation} from "../main/ExtractedOperation";
import {operations} from "../main/operations";

const processor: RightOperationProcessor = new RightOperationProcessor();

describe("RightOperationProcessor extractOperation method", () => {

    let result: ExtractedOperation;
    beforeEach(() => { result = { operation: operations.UNSUPPORTED_OPERATION, arguments: []}; });

    it("Find Operation 10!", () => {
        const found: boolean = processor.isOperationExtracted("10!", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.FACTORIAL, arguments: ["10"]});
    });
    it("Find Operation 10**", () => {
        const found: boolean = processor.isOperationExtracted("10**", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.SQUARE_INLINE, arguments: ["10"]});
    });
    it("Find Operation (5 + 6)!", () => {
        const found: boolean = processor.isOperationExtracted("(5 + 6)!", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.FACTORIAL, arguments: ["(5 + 6)"]});
    });
    it("Find Operation 10", () => {
        const found: boolean = processor.isOperationExtracted("10", result);
        expect(found).toEqual(false);
    });
    it("Find Operation (5 + 6)", () => {
        const found: boolean = processor.isOperationExtracted("(5 + 6)", result);
        expect(found).toEqual(false);
    });
});

describe("RightOperationProcessor performOperation method", () => {
    it("Find 6!", () => {
        expect(processor.performOperation(operations.FACTORIAL, [6])).toEqual(6*5*4*3*2);
    });
    it("Find 6**", () => {
        expect(processor.performOperation(operations.SQUARE_INLINE, [6])).toEqual(36);
    });
});

describe("RightOperationProcessor factorial method", () => {
    it("Find factorial of 3", () => {
        expect(processor.factorial(3)).toEqual(3*2);
    });
    it("Find factorial of 1", () => {
        expect(processor.factorial(1)).toEqual(1);
    });
    it("Find factorial of 6", () => {
        expect(processor.factorial(6)).toEqual(6*5*4*3*2);
    });
});
