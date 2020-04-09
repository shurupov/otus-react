import {Operation} from "./Operation";
import {ExtractedOperation} from "./ExtractedOperation";

export abstract class AbstractOperationProcessor {

    protected abstract getAvailableOperations(): Operation[];

    public extractOperation(expression: string, result: ExtractedOperation): boolean {
        for (let operation of this.getAvailableOperations()) {

            let openBrackets: number = 0;

            for (let i = expression.length - 1; i >= 0; i--) {
                const char: string = expression[i];
                if (char == ")") {
                    openBrackets++;
                }
                if (char == "(") {
                    openBrackets--;
                }
                if (openBrackets == 0 && char == operation) {
                    result.operation = operation as Operation;
                    result.arguments = this.extractArguments(expression, i);
                    return true;
                }
            }
        }
        return false;
    }

    public abstract extractArguments(expression: string, operationSignPosition: number): string[];

    public abstract performOperation(operation: Operation, parameters: number[]): number;

}