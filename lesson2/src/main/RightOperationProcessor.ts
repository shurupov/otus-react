import {operations} from "./operations";
import {AbstractOperationProcessor} from "./AbstractOperationProcessor";
import {ExtractedOperation} from "./ExtractedOperation";

export class RightOperationProcessor extends AbstractOperationProcessor {

    protected availableOperations: string[] = [
        operations.FACTORIAL,
        operations.SQUARE_INLINE
    ];

    protected getAvailableOperations(): string[] {
        return this.availableOperations;
    }

    public extractOperation(expression: string, result: ExtractedOperation): boolean {
        for (const operation of this.getAvailableOperations()) {
            if (this.isOperationFound(expression, operation, 0)) {
                result.operation = operation;
                result.arguments = this.extractArguments(expression, operation, 0);
                return true;
            }
        }
        return false;
    }

    protected isOperationFound(expression: string, operation: string, i: number /*i is unused parameter*/): boolean {
        return expression.substr(expression.length - operation.length, operation.length) === operation;
    }

    public performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.FACTORIAL: return this.factorial(parameters[0]);
            case operations.SQUARE_INLINE: return parameters[0] * parameters[0];
            default: throw new Error("Unsupported operation");
        }
    }

    public extractArguments(expression: string, operation: string, operationSignPosition: number /* third parameter is unused */): string[] {
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