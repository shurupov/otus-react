import {BracketsProcessor} from "./BracketsProcessor";
import {TwoArgumentsOperationProcessor} from "./TwoArgumentsOperationProcessor";
import {OneArgumentOperationProcessor,} from "./OneArgumentOperationProcessor";
import {ExtractedOperation} from "./ExtractedOperation";
import {Operation} from "./Operation";

export class Calculator {

    public static calculate(expression: string): number {
        expression = expression.trim();

        if (BracketsProcessor.isInBrackets(expression)) {
            return this.calculate(
                BracketsProcessor.openBrackets(expression)
            );
        }

        let extractedOperation: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        if (TwoArgumentsOperationProcessor.extractOperation(expression, extractedOperation)) {
            return TwoArgumentsOperationProcessor.performOperation(
                extractedOperation.operation,
                [
                    this.calculate(extractedOperation.arguments[0]),
                    this.calculate(extractedOperation.arguments[1])
                ]
            );
        }

        let extractedOneArgOperation: ExtractedOperation = { operation: Operation.UNSUPPORTED_OPERATION, arguments: []};
        if (OneArgumentOperationProcessor.extractOperation(expression, extractedOneArgOperation)) {
            return OneArgumentOperationProcessor.performOperation(
                extractedOneArgOperation.operation,
                [
                    this.calculate(extractedOneArgOperation.arguments[0])
                ]

            );
        }

        return parseFloat(expression);
    }
}