import {Operation} from "./Operation";
import {ExtractedOperation} from "./ExtractedOperation";

export class TwoArgumentsOperationProcessor {

    private static availableOperations: Operation[] = [
        Operation.POWER,
        Operation.ADDITION,
        Operation.SUBTRACTION,
        Operation.MULTIPLICATION,
        Operation.DIVISION
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
                    result.arguments[1] = expression.substr(operationSignPosition + 1);
                    return true;
                }
            }
        }
        return false;
    }

    public static performOperation(operation: Operation, parameters: number[]): number {
        switch (operation) {
            case Operation.POWER:          return Math.pow(parameters[0], parameters[1]);
            case Operation.ADDITION:       return parameters[0] + parameters[1];
            case Operation.SUBTRACTION:    return parameters[0] - parameters[1];
            case Operation.MULTIPLICATION: return parameters[0] * parameters[1];
            case Operation.DIVISION:       return parameters[0] / parameters[1];
            default: throw new Error("Unsupported operation");
        }
    }
}