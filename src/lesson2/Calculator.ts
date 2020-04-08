import {BracketsProcessor} from "./BracketsProcessor";
import {FindOperationResult, Operation, TwoArgumentsOperationProcessor} from "./TwoArgumentsOperationProcessor";
import {
    OneArgumentOperationProcessor,
    OneArgumentOperationResult,
    OneOrgOperation
} from "./OneArgumentOperationProcessor";

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

        let extractedOneArgOperation: OneArgumentOperationResult = { operation: OneOrgOperation.FACTORIAL, argument: ""};
        if (OneArgumentOperationProcessor.extractOperation(expression, extractedOneArgOperation)) {
            return OneArgumentOperationProcessor.performOperation(
                extractedOneArgOperation.operation,
                this.calculate(extractedOneArgOperation.argument)
            );
        }

        return parseFloat(expression);
    }
}