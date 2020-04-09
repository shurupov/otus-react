import {RightOperationProcessor} from "./RightOperationProcessor";
import {operations} from "./operations";

export class LeftOperationProcessor extends RightOperationProcessor{

    private operators: string[] = [
        operations.SUBTRACTION
    ];

    protected getAvailableOperations(): string[] {
        return this.operators;
    }


    protected isOperationFound(expression: string, operation: string, i: number): boolean {
        return i == 0 && super.isOperationFound(expression, operation, i);
    }

    public extractArguments(expression: string, operation: string, operationSignPosition: number): string[] {
        const result: string[] = [];
        result[0] = expression.substr(operationSignPosition + 1);
        return result;
    }

    public performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.SUBTRACTION: return -parameters[0];
            default: throw new Error("Unsupported operation");
        }
    }

}