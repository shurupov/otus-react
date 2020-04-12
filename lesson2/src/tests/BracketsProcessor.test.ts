import {BracketsProcessor} from "../main/BracketsProcessor";
import {ExtractedOperation} from "../main/ExtractedOperation";
import {operations} from "../main/operations";

const processor: BracketsProcessor = new BracketsProcessor();

describe("BracketsProcessor inBrackets method", () => {
    it("Check brackets (5)", () => {
        expect(processor.isInBrackets("(5)")).toEqual(true);
    });
    it("Check brackets (5 + 6)", () => {
        expect(processor.isInBrackets("(5 + 6)")).toEqual(true);
    });
    it("Check brackets (5 + 6) * 7", () => {
        expect(processor.isInBrackets("(5 + 6) * 7")).toEqual(false);
    });
    it("Check brackets (5 + 6) * (7 + 8)", () => {
        expect(processor.isInBrackets("(5 + 6) * (7 + 8)")).toEqual(false);
    });
});

describe("BracketsProcessor openBrackets method", () => {
    it("Open brackets (5)", () => {
        expect(processor.openBrackets("(5)")).toEqual("5");
    });
    it("Open brackets (5 + 6)", () => {
        expect(processor.openBrackets("(5 + 6)")).toEqual("5 + 6");
    });
});

describe("BracketsProcessor extractOperation method", () => {

    let result: ExtractedOperation;
    beforeEach(() => { result = { operation: operations.UNSUPPORTED_OPERATION, arguments: []}; });

    it("Find Operation (10)", () => {
        const found: boolean = processor.isOperationExtracted("(10)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.BRACKETS, arguments: ["10"]});
    });
    it("Find Operation (5 + 6)", () => {
        const found: boolean = processor.isOperationExtracted("(5 + 6)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.BRACKETS, arguments: ["5 + 6"]});
    });
    it("Find Operation 11", () => {
        const found: boolean = processor.isOperationExtracted("11", result);
        expect(found).toEqual(false);
    });
    it("Find Operation sin(5 + 6)", () => {
        const found: boolean = processor.isOperationExtracted("sin(5 + 6)", result);
        expect(found).toEqual(false);
    });
});

describe("BracketsProcessor performOperation method", () => {
    it("Find (22)", () => {
        expect(processor.performOperation(operations.BRACKETS, [22])).toEqual(22);
    });
});