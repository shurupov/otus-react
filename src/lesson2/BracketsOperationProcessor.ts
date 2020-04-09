import {AbstractOperationProcessor} from "./AbstractOperationProcessor";
import {operations} from "./operations";

export class BracketsOperationProcessor extends AbstractOperationProcessor {

    private availableOperations: string[] = [
        operations.SIN,
        operations.COS,
        operations.CTG,
        operations.TG,
        operations.SQRT,
        operations.SQR,
        operations.TRUNC,
        operations.ROUND,
    ];

    protected getAvailableOperations(): string[] {
        return this.availableOperations;
    }

    performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.SIN:  return Math.sin( this.degreesToRadians(parameters[0]) );
            case operations.COS:  return Math.cos( this.degreesToRadians(parameters[0]) );
            case operations.TG:   return Math.tan( this.degreesToRadians(parameters[0]) );
            case operations.CTG:  return 1 / Math.tan( this.degreesToRadians(parameters[0]) );
            case operations.SQR:  return parameters[0] * parameters[0];
            case operations.SQRT: return Math.sqrt(parameters[0]);
            case operations.TRUNC: return Math.trunc(parameters[0]);
            case operations.ROUND: return Math.round(parameters[0]);
            default: throw new Error("Unsupported operation");
        }
    }

    protected operationFound(expression: string, operation: string, i: number): boolean {
        if (!this.bracketOpenedHere(expression, operation, i)) {
            return false;
        }

        const operationNameLength = operation.length;
        const bracketToken: string = expression.substr(i - operationNameLength, operationNameLength);
        return (bracketToken === operation);
    }

    extractArguments(expression: string, operation: string, i: number): string[] {
        const closeBracketPosition = expression.indexOf(")", i + 1);
        const result: string[] = [];
        result[0] = expression.substr(i + 1, closeBracketPosition - i - 1);
        return result;
    }

    protected degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

}