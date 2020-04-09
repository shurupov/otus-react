import {ExtractedOperation} from "./ExtractedOperation";

export abstract class AbstractOperationProcessor {

    protected abstract getAvailableOperations(): string[];

    public extractOperation(expression: string, result: ExtractedOperation): boolean {
        for (const operation of this.getAvailableOperations()) {

            let openBrackets = 0;

            for (let i = expression.length - 1; i >= 0; i--) {
                const char: string = expression[i];
                if (char === ")") {
                    openBrackets++;
                }
                if (this.bracketOpenedHere(expression, operation, i)) {
                    openBrackets--;
                }
                if (openBrackets === 0 && this.operationFound(expression, operation, i)) {
                    result.operation = operation;
                    result.arguments = this.extractArguments(expression, operation, i);
                    return true;
                }
            }
        }
        return false;
    }

    protected operationFound(expression: string, operation: string, i: number): boolean {
        const char: string = expression[i];
        return char === operation;
    }

    protected bracketOpenedHere(expression: string, operation: string, i: number): boolean {
        const char: string = expression[i];
        return (char === "(");
    }

    public abstract extractArguments(expression: string, operation: string, operationSignPosition: number): string[];

    public abstract performOperation(operation: string, parameters: number[]): number;

}