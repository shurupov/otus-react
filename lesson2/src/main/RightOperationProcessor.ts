import {operations} from "./operations";
import {OneArgumentOperationProcessor} from "./OneArgumentOperationProcessor";

export class RightOperationProcessor extends OneArgumentOperationProcessor {

    protected availableOperations: string[] = [
        operations.FACTORIAL,
        operations.SQUARE_INLINE
    ];

    protected isOperationFound(expression: string, operation: string): boolean {
        return expression.substr(expression.length - operation.length, operation.length) === operation;
    }

    public performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.FACTORIAL: return this.factorial(parameters[0]);
            case operations.SQUARE_INLINE: return parameters[0] * parameters[0];
            default: throw new Error("Unsupported operation");
        }
    }

    public extractArguments(expression: string, operation: string): string[] {
        const result: string[] = [];
        result[0] = expression.substr(0, expression.length - operation.length);
        return result;
    }

    public factorial(count: number): number {
        if (count === 1) {
            return 1;
        }
        return count * this.factorial(count - 1);
    }

}