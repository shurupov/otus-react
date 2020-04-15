import {operations} from "./operations";

interface ExpressionContainer {
    expression: string
}

export class ReversePolishNotationCalculator {

    private twoArgumentsOperations: string[] = [
        operations.POWER,
        operations.ADDITION,
        operations.SUBTRACTION,
        operations.MULTIPLICATION,
        operations.DIVISION
    ];
    
    private oneArgumentOperations: string[] = [
        operations.FACTORIAL,
        operations.SQUARE_INLINE,
        operations.SIN,
        operations.COS,
        operations.CTG,
        operations.TG,
        operations.SQRT,
        operations.SQR,
        operations.TRUNC,
        operations.ROUND,
    ];

    protected availableOperations: string[] = this.oneArgumentOperations.concat(this.twoArgumentsOperations);

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
                //console.log("Found operation: " + operation);
                expressionContainer.expression = expression.substr(0, position - operation.length + 1);
                return this.performOperation(expressionContainer, operation);
            }
        }

        let numberLength = 0;
        let startPosition: number = position - numberLength;
        let resultString: string = expression.substr(startPosition, numberLength);

        do {
            numberLength++;
            startPosition = position - numberLength + 1;
            resultString = expression.substr(startPosition, numberLength);
        } while (startPosition > 0 && expression.substr(startPosition - 1, 1) != " ");

        expressionContainer.expression = expression.substr(0, startPosition);

        //console.log("Found number: " + resultString);

        return parseFloat(resultString);
    }
    
    public performOperation(expressionContainer: ExpressionContainer, operation: string): number {
        let result: number;
        if (this.twoArgumentsOperations.includes(operation)) {
            const argument2: number = this.calc(expressionContainer);
            const argument1: number = this.calc(expressionContainer);
            result = this.performTwoArgumentsOperation(operation, argument1, argument2);
            //console.log("Calculated " + argument1 + " " + argument2 + " " + operation + " = " + result);
            return result;
        }
        if (this.oneArgumentOperations.includes(operation)) {
            const argument: number = this.calc(expressionContainer);
            result = this.performOneArgumentOperation(operation, argument);
            //console.log("Calculated " + argument + operation + " = " + result);
            return result;
        }
        throw new Error("Unsupported operation");
    }

    public performTwoArgumentsOperation(operation: string, argument1: number, argument2: number): number {
        switch (operation) {
            case operations.POWER:          return Math.pow(argument1, argument2);
            case operations.ADDITION:       return argument1 + argument2;
            case operations.SUBTRACTION:    return argument1 - argument2;
            case operations.MULTIPLICATION: return argument1 * argument2;
            case operations.DIVISION:       return argument1 / argument2;
            default:                        throw new Error("Unsupported operation");
        }
    }

    public performOneArgumentOperation(operation: string, argument: number): number {
        switch (operation) {
            case operations.FACTORIAL:     return this.factorial(argument);
            case operations.SQUARE_INLINE: return argument * argument;
            case operations.SIN:           return Math.sin( this.degreesToRadians(argument) );
            case operations.COS:           return Math.cos( this.degreesToRadians(argument) );
            case operations.TG:            return Math.tan( this.degreesToRadians(argument) );
            case operations.CTG:           return 1 / Math.tan( this.degreesToRadians(argument) );
            case operations.SQR:           return argument * argument;
            case operations.SQRT:          return Math.sqrt(argument);
            case operations.TRUNC:         return Math.trunc(argument);
            case operations.ROUND:         return Math.round(argument);
            default:                       throw new Error("Unsupported operation");
        }
    }

    protected degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    public factorial(count: number): number {
        if (count === 1) {
            return 1;
        }
        return count * this.factorial(count - 1);
    }

}