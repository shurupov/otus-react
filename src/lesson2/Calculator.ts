import {BracketsProcessor} from "./BracketsProcessor";
import {FindOperationResult, Operation, TwoArgumentsOperationProcessor} from "./TwoArgumentsOperationProcessor";

export class Calculator {

    public static calculate(expression: string): number {
        expression = expression.trim();

        if (BracketsProcessor.isInBrackets(expression)) {
            return this.calculate(
                BracketsProcessor.openBrackets(expression)
            );
        }

        let extractedOperation: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        if (TwoArgumentsOperationProcessor.extractOperation(expression, extractedOperation)) {
            return TwoArgumentsOperationProcessor.performOperation(
                extractedOperation.operation,
                this.calculate(extractedOperation.firstArgument),
                this.calculate(extractedOperation.secondArgument)
            );
        }

        return parseFloat(expression);
    }
}