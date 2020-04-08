import Calculator, {FindOperationResult, Operation} from "../../src/lesson2/Calculator";

describe("Calculator calculate method", () => {
    it("Addition 4 + 5", () => {
        expect(Calculator.calculate("4 + 5")).toEqual(9);
    });
    it("Multiplication 8 - 6", () => {
        expect(Calculator.calculate("8 - 6")).toEqual(2);
    });
    it("Multiplication 8 * 6", () => {
        expect(Calculator.calculate("8*6")).toEqual(48);
    });
    it("Multiplication 25 / 10", () => {
        expect(Calculator.calculate("   25    /    10")).toEqual(2.5);
    });
    it("Complicated expression 5*6-7/2", () => {
        expect(Calculator.calculate("5*6-7/2")).toEqual(26.5);
    });
    it("Just number 25.001", () => {
        expect(Calculator.calculate("  25.001 ")).toEqual(25.001);
    });
});

describe("Calculator performOperationMethod method", () => {
    it("Addition 4 + 5", () => {
        expect(Calculator.performOperation(Operation.ADDITION, "4", "5")).toEqual(9);
    });
    it("Multiplication 8 - 6", () => {
        expect(Calculator.performOperation(Operation.SUBTRACTION, "8", "6")).toEqual(2);
    });
    it("Multiplication 8 * 6", () => {
        expect(Calculator.performOperation(Operation.MULTIPLICATION, "8", "6")).toEqual(48);
    });
    it("Multiplication 25 / 10", () => {
        expect(Calculator.performOperation(Operation.DIVISION, "25", "10")).toEqual(2.5);
    });
});

describe("Calculator extractOperation method", () => {
    it("Find Operation 4 + 5", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("4 + 5", result as FindOperationResult);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.ADDITION, firstArgument: "4 ", secondArgument: " 5"});
    });
    it("Find Operation 4 -5", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("4 -5", result as FindOperationResult);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.SUBTRACTION, firstArgument: "4 ", secondArgument: "5"});
    });
    it("Find Operation 4* 5", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("4* 5", result as FindOperationResult);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.MULTIPLICATION, firstArgument: "4", secondArgument: " 5"});
    });
    it("Find Operation 242424", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("242424", result as FindOperationResult);
        expect(found).toEqual(false);
    });
    it("Find Operation 5*6-7", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("5*6-7", result as FindOperationResult);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.SUBTRACTION, firstArgument: "5*6", secondArgument: "7"});
    });
    it("Find Operation 5*6-7/2", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("5*6-7/2", result as FindOperationResult);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.SUBTRACTION, firstArgument: "5*6", secondArgument: "7/2"});
    });
});