
export default class Calculator {

    public static calculate(expression: string): number {
        expression = expression.trim();
        if (this.containsOperation(expression)) {
            let operation: [Operation, string, string] = this.extractOperation(expression);
            return this.performOperation(operation[0], operation[1], operation[2]);
        } else {
            return parseFloat(expression);
        }
    }

    public static extractOperation(expression: string): [Operation, string, string] {
        let action : [Operation, number] = this.findAction(expression);

        const operation = action[0];
        const operationSignPosition = action[1];
        const firstArgument = expression.substr(0, operationSignPosition);
        const secondArgument = expression.substr(operationSignPosition + 1);
        return [operation, firstArgument, secondArgument];
    }

    public static findAction(expression: string): [Operation, number] {

        /*for (let operationKey: Operation in Object.values(Operation)) {

            let operationSignPosition: number = expression.lastIndexOf(operationKey);
            if (operationSignPosition != -1) {
                operationSignPosition = expression.lastIndexOf("-");
                return [operationKey, operationSignPosition];
            }
        }*/

        let operationSignPosition: number = expression.lastIndexOf("+");
        let operation: Operation = Operation.ADDITION;
        if (operationSignPosition == -1) {
            operationSignPosition = expression.lastIndexOf("-");
            operation = Operation.SUBTRACTION;
        }
        if (operationSignPosition == -1) {
            operationSignPosition = expression.lastIndexOf("/");
            operation = Operation.DIVISION;
        }
        if (operationSignPosition == -1) {
            operationSignPosition = expression.lastIndexOf("*");
            operation = Operation.MULTIPLICATION;
        }
        return [operation, operationSignPosition];
    }

    public static containsOperation(expression: string): boolean {
        return expression.indexOf("+") != -1
            || expression.indexOf("-") != -1
            || expression.indexOf("*") != -1
            || expression.indexOf("/") != -1;
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

enum Operation {
    ADDITION = "+",
    SUBTRACTION = "-",
    MULTIPLICATION = "*",
    DIVISION = "/"
}