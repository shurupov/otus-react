import {Operation} from "./TwoArgumentsOperationProcessor";

export enum OneOrgOperation {
    FACTORIAL = "!"
}

export interface OneArgumentOperationResult {
    operation: OneOrgOperation,
    argument: string
}

export class OneArgumentOperationProcessor {

    private static availableOperations: OneOrgOperation[] = [
        OneOrgOperation.FACTORIAL
    ];

    public static extractOperation(expression: string, result: OneArgumentOperationResult): boolean {
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
                    result.operation = operation as OneOrgOperation;
                    result.argument = expression.substr(0, operationSignPosition);
                    return true;
                }
            }
        }
        return false;
    }

    public static performOperation(operation: OneOrgOperation, argument: number): number {
        switch (operation) {
            case OneOrgOperation.FACTORIAL: return this.factorial(argument);
            default: throw new Error("Unsupported operation");
        }
    }

    public static factorial(count: number): number {
        if (count == 1) {
            return 1;
        }
        return count * this.factorial(count - 1);
    }

}