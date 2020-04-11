import {AbstractOperationProcessor} from "./AbstractOperationProcessor";
import {operations} from "./operations";
import {ExtractedOperation} from "./ExtractedOperation";

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

    extractOperation(expression: string, result: ExtractedOperation): boolean {
        if (expression[expression.length - 1] !== ")") {
            return false;
        }
        for (const operation of this.getAvailableOperations()) {
            if (this.isOperationFound(expression, operation, 0)) {
                result.operation = operation;
                result.arguments = this.extractArguments(expression, operation, 0);
                return true;
            }
        }
        return false;
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

    protected isOperationFound(expression: string, operation: string, i: number/* i is unused parameter*/): boolean {
        return (expression.substr(0, operation.length + 1) === operation + "(");
    }

    extractArguments(expression: string, operation: string, i: number/*i - unused parameter*/): string[] {
        const result: string[] = [];
        result[0] = expression.substr(operation.length + 1, expression.length - operation.length - 2);
        return result;
    }

    protected degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

}