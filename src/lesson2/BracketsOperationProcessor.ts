import {AbstractOperationProcessor} from "./AbstractOperationProcessor";
import {Operation} from "./Operation";

export class BracketsOperationProcessor extends AbstractOperationProcessor {

    private availableOperations: Operation[] = [
        Operation.SIN,
        Operation.COS
    ];

    protected getAvailableOperations(): Operation[] {
        return this.availableOperations;
    }

    performOperation(operation: Operation, parameters: number[]): number {
        switch (operation) {
            case Operation.SIN: return Math.sin( this.degreesToRadians(parameters[0]) );
            case Operation.COS: return Math.cos( this.degreesToRadians(parameters[0]) );
            default: throw new Error("Unsupported operation");
        }
    }

    protected bracketOpenedHere(expression: string, operation: Operation, i: number) {
        return super.bracketOpenedHere(expression, operation, i);
    }

    protected operationFound(expression: string, operation: Operation, i: number): boolean {
        if (!super.bracketOpenedHere(expression, operation, i)) {
            return false;
        }

        let operationNameLength = (operation as string).length;
        const bracketToken: string = expression.substr(i - operationNameLength, operationNameLength);
        return (bracketToken == (operation as string));
    }

    extractArguments(expression: string, operation: Operation, i: number): string[] {
        let closeBracketPosition = expression.indexOf(")", i + 1);
        let result: string[] = [];
        result[0] = expression.substr(i + 1, closeBracketPosition - i - 1);
        return result;
    }

    protected degreesToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

}