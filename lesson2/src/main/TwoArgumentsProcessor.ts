import {operations} from "./operations";
import {AbstractOperationProcessor} from "./AbstractOperationProcessor";

export class TwoArgumentsProcessor extends AbstractOperationProcessor {

    private availableOperations: string[] = [
        operations.POWER,
        operations.ADDITION,
        operations.SUBTRACTION,
        operations.MULTIPLICATION,
        operations.DIVISION
    ];

    protected getAvailableOperations(): string[] {
        return this.availableOperations;
    }

    public extractArguments(expression: string, operation: string, operationSignPosition: number): string[] {
        const result: string[] = [];
        result[0] = expression.substr(0, operationSignPosition);
        result[1] = expression.substr(operationSignPosition + 1);
        return result;
    }

    public performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.POWER:          return Math.pow(parameters[0], parameters[1]);
            case operations.ADDITION:       return parameters[0] + parameters[1];
            case operations.SUBTRACTION:    return parameters[0] - parameters[1];
            case operations.MULTIPLICATION: return parameters[0] * parameters[1];
            case operations.DIVISION:       return parameters[0] / parameters[1];
            default: throw new Error("Unsupported operation");
        }
    }
}