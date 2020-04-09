import {BracketsProcessor} from "./BracketsProcessor";
import {TwoArgumentsProcessor} from "./TwoArgumentsProcessor";
import {OneArgumentProcessor,} from "./OneArgumentProcessor";
import {ExtractedOperation} from "./ExtractedOperation";
import {Operation} from "./Operation";

export class Calculator {

    private processor1: TwoArgumentsProcessor = new TwoArgumentsProcessor();
    private processor2: OneArgumentProcessor = new OneArgumentProcessor();

    public calculate(expression: string): number {
        expression = expression.trim();

        if (BracketsProcessor.isInBrackets(expression)) {
            return this.calculate(
                BracketsProcessor.openBrackets(expression)
            );
        }

        let operation1: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        if (this.processor1.extractOperation(expression, operation1)) {
            return this.processor1.performOperation(
                operation1.operation,
                [
                    this.calculate(operation1.arguments[0]),
                    this.calculate(operation1.arguments[1])
                ]
            );
        }

        let operation2: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        if (this.processor2.extractOperation(expression, operation2)) {
            return this.processor2.performOperation(
                operation2.operation,
                [
                    this.calculate(operation2.arguments[0])
                ]

            );
        }

        return parseFloat(expression);
    }
}