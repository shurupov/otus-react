import {BracketsOperationProcessor} from "../main/BracketsOperationProcessor";
import {ExtractedOperation} from "../main/ExtractedOperation";
import {operations} from "../main/operations";

const processor: BracketsOperationProcessor = new BracketsOperationProcessor();

describe("BracketsOperationProcessor extractOperation method", () => {

    let result: ExtractedOperation;
    beforeEach(() => { result = { operation: operations.UNSUPPORTED_OPERATION, arguments: []}; });

    test.each([
        ["sin", "45", { operation: operations.SIN, arguments: ["45"]}],
        ["cos", "30", { operation: operations.COS, arguments: ["30"]}],
        ["tg", "30", { operation: operations.TG, arguments: ["30"]}],
        ["sqrt", "81", { operation: operations.SQRT, arguments: ["81"]}],
        ["ctg", "30", { operation: operations.CTG, arguments: ["30"]}],
        ["sqr", "10", { operation: operations.SQR, arguments: ["10"]}],
    ])("Extract operation %s, %s", (operation, argument, expected) => {
        expect(processor.isOperationExtracted(operation + "(" + argument + ")", result)).toEqual(true);
        expect(result).toEqual(expected);
    });
});

describe("BracketsOperationProcessor performOperation method", () => {
    it("sin(30)", () => {
        expect(processor.performOperation(operations.SIN, [30])).toEqual(Math.sin( 30 * Math.PI / 180));
    });
    it("tg(30)", () => {
        expect(processor.performOperation(operations.TG, [30])).toEqual(Math.tan( 30 * Math.PI / 180));
    });
    it("ctg(30)", () => {
        expect(processor.performOperation(operations.CTG, [30])).toEqual(1 / Math.tan( 30 * Math.PI / 180));
    });
    it("cos(30)", () => {
        expect(processor.performOperation(operations.COS, [30])).toEqual(Math.cos( 30 * Math.PI / 180));
    });
    it("trunc(4.5)", () => {
        expect(processor.performOperation(operations.TRUNC, [4.5])).toEqual(4);
    });
    it("round(4.6)", () => {
        expect(processor.performOperation(operations.ROUND, [4.6])).toEqual(5);
    });
    it("sqrt(4)", () => {
        expect(processor.performOperation(operations.SQRT, [4])).toEqual(2);
    });
    it("sqrt(2)", () => {
        expect(processor.performOperation(operations.SQR, [2])).toEqual(4);
    });
});