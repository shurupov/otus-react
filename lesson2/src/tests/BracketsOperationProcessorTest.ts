import {BracketsOperationProcessor} from "../main/BracketsOperationProcessor";
import {ExtractedOperation} from "../main/ExtractedOperation";
import {operations} from "../main/operations";

const processor: BracketsOperationProcessor = new BracketsOperationProcessor();

describe("BracketsOperationProcessor extractOperation method", () => {
    it("Find Operation sin(45)", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("sin(45)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.SIN, arguments: ["45"]});
    });
    it("Find Operation cos(30)", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("cos(30)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.COS, arguments: ["30"]});
    });
    it("Find Operation tg(30)", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("tg(30)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.TG, arguments: ["30"]});
    });
    it("Find Operation ctg(30)", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("ctg(30)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.CTG, arguments: ["30"]});
    });
    it("Find Operation sqrt(30)", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("sqrt(30)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.SQRT, arguments: ["30"]});
    });
    it("Find Operation sqr(30)", () => {
        const result: ExtractedOperation = { operation: operations.UNSUPPORTED_OPERATION, arguments: []};
        const found: boolean = processor.extractOperation("sqr(30)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: operations.SQR, arguments: ["30"]});
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