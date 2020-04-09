import {BracketsOperationProcessor} from "../../src/lesson2/BracketsOperationProcessor";
import {ExtractedOperation} from "../../src/lesson2/ExtractedOperation";
import {Operation} from "../../src/lesson2/Operation";

const processor: BracketsOperationProcessor = new BracketsOperationProcessor();

describe("BracketsOperationProcessor extractOperation method", () => {
    it("Find Operation sin(45)", () => {
        let result: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        let found: boolean = processor.extractOperation("sin(45)", result);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.SIN, arguments: ["45"]});
    });
});
