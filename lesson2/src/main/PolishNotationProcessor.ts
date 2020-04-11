import {ExtractedOperation} from "./ExtractedOperation";
import {operations} from "./operations";

interface ExpressionContainer {
    expression: string
}

export class PolishNotationProcessor {

    protected availableOperations: string[] = [
        operations.POWER,
        operations.ADDITION,
        operations.SUBTRACTION,
        operations.MULTIPLICATION,
        operations.DIVISION
    ];

    public calcExpression(expression: string): number {
        return this.calc({expression: expression});
    }

    public calc(expressionContainer: ExpressionContainer): number {
        const expression = expressionContainer.expression;
        let position: number = expression.length - 1;
        while (expression[position] === " ") {
            position--;
        }

        let operation: string;

        for (const availableOperation of this.availableOperations) {
            if (expression.substr(position - availableOperation.length + 1, availableOperation.length) === availableOperation) {
                operation = availableOperation;
                expressionContainer.expression = expression.substr(0, position - operation.length + 1);
                const argument2: number = this.calc(expressionContainer);
                const argument1: number = this.calc(expressionContainer);

                return this.performOperation(operation, [argument1, argument2]);
            }
        }

        let numberLength: number = 0;
        let startPosition: number = position - numberLength;
        let resultString: string = expression.substr(startPosition, numberLength);

        do {
            numberLength++;
            startPosition = position - numberLength + 1;
            resultString = expression.substr(startPosition, numberLength);
        } while (startPosition > 0 && expression.substr(startPosition - 1, 1) != " ");

        expressionContainer.expression = expression.substr(0, startPosition);

        return parseFloat(resultString);
    }

    extractOperation(expression: string, result: ExtractedOperation): boolean {
        for (let i: number = expression.length - 1; i <= 0; i--) {

        }
        return false;
    }

    public performOperation(operation: string, parameters: number[]): number {
        switch (operation) {
            case operations.POWER:          return Math.pow(parameters[0], parameters[1]);
            case operations.ADDITION:       return parameters[0] + parameters[1];
            case operations.SUBTRACTION:    return parameters[0] - parameters[1];
            case operations.MULTIPLICATION: return parameters[0] * parameters[1];
            case operations.DIVISION:       return parameters[0] / parameters[1];
            default: throw new Error("Unsupported operation");
        }
    }

}