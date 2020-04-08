export enum Operation {
    ADDITION = "+",
    SUBTRACTION = "-",
    MULTIPLICATION = "*",
    DIVISION = "/"
}

export interface FindOperationResult {
    operation: Operation,
    firstArgument: string,
    secondArgument: string
}

export default class Calculator {

    private static availableOperations: Operation[] = [
        Operation.ADDITION,
        Operation.SUBTRACTION,
        Operation.MULTIPLICATION,
        Operation.DIVISION
    ];

    public static calculate(expression: string): number {
        expression = expression.trim();
        let extractedOperation: FindOperationResult = { operation: Operation.ADDITION, firstArgument: "", secondArgument: ""};
        if (this.findOperation1(expression, extractedOperation)) {
            return this.performOperation(extractedOperation.operation, extractedOperation.firstArgument, extractedOperation.secondArgument);
        } else {
            return parseFloat(expression);
        }
    }

    public static findOperation1(expression: string, result: FindOperationResult): boolean {
        for (let operation of this.availableOperations) {
            let operationSignPosition: number = expression.lastIndexOf(operation);
            if (operationSignPosition != -1) {
                result.operation = operation as Operation;
                result.firstArgument = expression.substr(0, operationSignPosition);
                result.secondArgument = expression.substr(operationSignPosition + 1);
                return true;
            }
        }
        return false;
    }

    public static performOperation(operation: Operation, firstArgument: string, secondArgument: string): number {
        switch (operation) {
            case Operation.ADDITION:       return this.calculate(firstArgument) + this.calculate(secondArgument);
            case Operation.SUBTRACTION:    return this.calculate(firstArgument) - this.calculate(secondArgument);
            case Operation.MULTIPLICATION: return this.calculate(firstArgument) * this.calculate(secondArgument);
            case Operation.DIVISION:       return this.calculate(firstArgument) / this.calculate(secondArgument);
            default: throw new Error("Unsupported operation");
        }
    }
}