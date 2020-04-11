import {RightOperationProcessor} from "./RightOperationProcessor";
import {operations} from "./operations";

export class LeftOperationProcessor extends RightOperationProcessor{

    private operators: string[] = [
        operations.SUBTRACTION
    ];

    protected getAvailableOperations(): string[] {
        return this.operators;
    }

    protected isOperationFound(expression: string, operation: string, i: number /*i - unused parameter*/): boolean {
        return expression.substr(0, operation.length) === operation;
    }

    public extractArguments(expression: string, operation: string, operationSignPosition: number /*third parameter is unused*/): string[] {
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