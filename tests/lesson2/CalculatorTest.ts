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
    it("Complicated expression with brackets (10 + 30) / (12 - 4)", () => {
        expect(Calculator.calculate("(10 + 30) / (12 - 4)")).toEqual(5);
    });
    it("Complicated expression with brackets  (3+3)*11+5*(5+5)", () => {
        expect(Calculator.calculate(" (3+3)*11+5*(5+5)")).toEqual(116);
    });
    it("Complicated expression with brackets (6+4)^4", () => {
        expect(Calculator.calculate("(6+4)^4")).toEqual(10000);
    });
});

describe("Calculator performOperationMethod method", () => {
    it("Addition 4 + 5", () => {
        expect(Calculator.performOperation(Operation.ADDITION, 4, 5)).toEqual(9);
    });
    it("Multiplication 8 - 6", () => {
        expect(Calculator.performOperation(Operation.SUBTRACTION, 8, 6)).toEqual(2);
    });
    it("Multiplication 8 * 6", () => {
        expect(Calculator.performOperation(Operation.MULTIPLICATION, 8, 6)).toEqual(48);
    });
    it("Multiplication 25 / 10", () => {
        expect(Calculator.performOperation(Operation.DIVISION, 25, 10)).toEqual(2.5);
    });
    it("Multiplication 3 ^ 4", () => {
        expect(Calculator.performOperation(Operation.POWER, 3, 4)).toEqual(81);
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
    it("Find the first Operation 6*(42-10)+(22-1)", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("6*(42-10)+(22-1)", result as FindOperationResult);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.ADDITION, firstArgument: "6*(42-10)", secondArgument: "(22-1)"});
    });
    it("Find the first Operation (49+51) / (32-12)", () => {
        let result: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        let found: boolean = Calculator.extractOperation("(49+51) / (32-12)", result as FindOperationResult);
        expect(found).toEqual(true);
        expect(result).toEqual({ operation: Operation.DIVISION, firstArgument: "(49+51) ", secondArgument: " (32-12)"});
    });
});

describe("Calculator inBrackets method", () => {
    it("Check brackets (5)", () => {
        expect(Calculator.isInBrackets("(5)")).toEqual(true);
    });
    it("Check brackets (5 + 6)", () => {
        expect(Calculator.isInBrackets("(5 + 6)")).toEqual(true);
    });
    it("Check brackets (5 + 6) * 7", () => {
        expect(Calculator.isInBrackets("(5 + 6) * 7")).toEqual(false);
    });
    it("Check brackets (5 + 6) * (7 + 8)", () => {
        expect(Calculator.isInBrackets("(5 + 6) * (7 + 8)")).toEqual(false);
    });
});

describe("Calculator openBrackets method", () => {
    it("Open brackets (5)", () => {
        expect(Calculator.openBrackets("(5)")).toEqual("5");
    });
    it("Open brackets (5 + 6)", () => {
        expect(Calculator.openBrackets("(5 + 6)")).toEqual("5 + 6");
    });
});