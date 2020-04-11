import {operations} from "./operations";
import {OneArgumentOperationProcessor} from "./OneArgumentOperationProcessor";

export class LeftOperationProcessor extends OneArgumentOperationProcessor {

    protected availableOperations: string[] = [
        operations.SUBTRACTION
    ];

    protected isOperationFound(expression: string, operation: string): boolean {
        return expression.substr(0, operation.length) === operation;
    }

    public extractArguments(expression: string, operation: string): string[] {
        const result: string[] = [];
        result[0] = expression.substr(operation.length);
        return result;
    }

    public performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.SUBTRACTION: return -parameters[0];
            default: throw new Error("Unsupported operation");
        }
    }

}