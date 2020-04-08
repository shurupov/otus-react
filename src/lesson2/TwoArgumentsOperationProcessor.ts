export enum Operation {
    POWER = "^",
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

export class TwoArgumentsOperationProcessor {

    private static availableOperations: Operation[] = [
        Operation.POWER,
        Operation.ADDITION,
        Operation.SUBTRACTION,
        Operation.MULTIPLICATION,
        Operation.DIVISION
    ];


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

    public static performOperation(operation: Operation, firstArgument: number, secondArgument: number): number {
        switch (operation) {
            case Operation.POWER:          return Math.pow(firstArgument, secondArgument);
            case Operation.ADDITION:       return firstArgument + secondArgument;
            case Operation.SUBTRACTION:    return firstArgument - secondArgument;
            case Operation.MULTIPLICATION: return firstArgument * secondArgument;
            case Operation.DIVISION:       return firstArgument / secondArgument;
            default: throw new Error("Unsupported operation");
        }
    }
}