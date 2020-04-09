import {operations} from "./operations";
import {AbstractOperationProcessor} from "./AbstractOperationProcessor";

export class OneArgumentProcessor extends AbstractOperationProcessor {

    private availableOperations: string[] = [
        operations.FACTORIAL,
        operations.SQUARE_INLINE
    ];

    protected getAvailableOperations(): string[] {
        return this.availableOperations;
    }

    public performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.FACTORIAL: return this.factorial(parameters[0]);
            case operations.SQUARE_INLINE: return parameters[0] * parameters[0];
            default: throw new Error("Unsupported operation");
        }
    }

    public extractArguments(expression: string, operation: string, operationSignPosition: number): string[] {
        const result: string[] = [];
        result[0] = expression.substr(0, operationSignPosition - operation.length + 1);
        return result;
    }

    public factorial(count: number): number {
        if (count === 1) {
            return 1;
        }
        return count * this.factorial(count - 1);
    }

}