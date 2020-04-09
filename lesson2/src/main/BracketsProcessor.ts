import {AbstractOperationProcessor} from "./AbstractOperationProcessor";
import {operations} from "./operations";
import {ExtractedOperation} from "./ExtractedOperation";

export class BracketsProcessor extends AbstractOperationProcessor{

    private availableOperations: string[] = [
        operations.BRACKETS
    ];

    protected getAvailableOperations(): string[] {
        return this.availableOperations;
    }

    public openBrackets(expression: string): string {
        return expression.substr(1, expression.length - 2);
    }

    public isInBrackets(expression: string): boolean {
        const containsBrackets = (expression.indexOf("(") === 0 && expression.lastIndexOf(")") === expression.length - 1);
        if (!containsBrackets) {
            return false;
        }
        let openBrackets = 0;
        for (let i = 0; i < expression.length; i++) {
            const char: string = expression[i];
            if (char === "(") {
                openBrackets++;
            }
            if (char === ")") {
                openBrackets--;
                if (openBrackets === 0 && i < expression.length - 1) {
                    return false;
                }
            }
        }
        return true;
    }

    public extractOperation(expression: string, result: ExtractedOperation): boolean {
        if (this.isInBrackets(expression)) {
            result.operation = operations.BRACKETS;
            result.arguments[0] = this.openBrackets(expression);
            return true;
        }
        return false;
    }

    extractArguments(expression: string, operation: string, operationSignPosition: number): string[] {
        return [];
    }

    performOperation(operation: string, parameters: number[]): number {
        return parameters[0];
    }
}