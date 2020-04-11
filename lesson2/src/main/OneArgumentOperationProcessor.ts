import {AbstractOperationProcessor} from "./AbstractOperationProcessor";
import {ExtractedOperation} from "./ExtractedOperation";

export abstract class OneArgumentOperationProcessor extends AbstractOperationProcessor {

    public extractOperation(expression: string, result: ExtractedOperation): boolean {
        for (const operation of this.availableOperations) {
            if (this.isOperationFound(expression, operation)) {
                result.operation = operation;
                result.arguments = this.extractArguments(expression, operation);
                return true;
            }
        }
        return false;
    }

    protected abstract isOperationFound(expression: string, operation: string): boolean;

    public abstract extractArguments(expression: string, operation: string): string[];
}