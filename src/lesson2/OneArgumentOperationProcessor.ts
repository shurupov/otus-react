import {Operation} from "./Operation";
import {ExtractedOperation} from "./ExtractedOperation";

export class OneArgumentOperationProcessor {

    private static availableOperations: Operation[] = [
        Operation.FACTORIAL
    ];

    public static extractOperation(expression: string, result: ExtractedOperation): boolean {
        for (let operation of this.availableOperations) {

            let openBrackets: number = 0;

            for (let i = expression.length - 1; i >= 0; i--) {
                const char: string = expression[i];
                if (char == ")") {
                    openBrackets++;
                }
                if (char == "(") {
                    openBrackets--;
                }
                if (openBrackets == 0 && char == operation) {
                    const operationSignPosition = i;
                    result.operation = operation as Operation;
                    result.arguments[0] = expression.substr(0, operationSignPosition);
                    return true;
                }
            }
        }
        return false;
    }

    public static performOperation(operation: Operation, parameters: number[]): number {
        switch (operation) {
            case Operation.FACTORIAL: return this.factorial(parameters[0]);
            default: throw new Error("Unsupported operation");
        }
    }

    public static factorial(count: number): number {
        if (count == 1) {
            return 1;
        }
        return count * this.factorial(count - 1);
    }

}