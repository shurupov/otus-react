import {BracketsProcessor} from "./BracketsProcessor";
import {TwoArgumentsProcessor} from "./TwoArgumentsProcessor";
import {OneArgumentProcessor,} from "./OneArgumentProcessor";
import {ExtractedOperation} from "./ExtractedOperation";
import {Operation} from "./Operation";
import {AbstractOperationProcessor} from "./AbstractOperationProcessor";
import {BracketsOperationProcessor} from "./BracketsOperationProcessor";

export class Calculator {

    private processors: AbstractOperationProcessor[] = [
        new TwoArgumentsProcessor(),
        new OneArgumentProcessor(),
        new BracketsOperationProcessor(),
    ];

    public calculate(expression: string): number {
        expression = expression.trim();

        if (BracketsProcessor.isInBrackets(expression)) {
            return this.calculate(
                BracketsProcessor.openBrackets(expression)
            );
        }

        for (let processor of this.processors) {
            let operation: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
            if (processor.extractOperation(expression, operation)) {
                return processor.performOperation(
                    operation.operation,
                    operation.arguments.map((argument: string) => this.calculate(argument))
                );
            }
        }

        return parseFloat(expression);
    }
}