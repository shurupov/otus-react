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
        if (this.extractOperation(expression, extractedOperation)) {
            return this.performOperation(extractedOperation.operation, extractedOperation.firstArgument, extractedOperation.secondArgument);
        } else {
            return parseFloat(expression);
        }
    }

    public static extractOperation(expression: string, result: FindOperationResult): boolean {
        for (let operation of this.availableOperations) {

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
                    const operationSignPosition = i;
                    result.operation = operation as Operation;
                    result.firstArgument = expression.substr(0, operationSignPosition);
                    result.secondArgument = expression.substr(operationSignPosition + 1);
                    return true;
                }
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