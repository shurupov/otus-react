import { operations } from "./operations";
import { AbstractOperationProcessor } from "./AbstractOperationProcessor";
import { ExtractedOperation } from "./ExtractedOperation";

export class TwoArgumentsProcessor extends AbstractOperationProcessor {
  protected availableOperations: string[] = [
    operations.POWER,
    operations.ADDITION,
    operations.SUBTRACTION,
    operations.MULTIPLICATION,
    operations.DIVISION,
  ];

  private forbidOperations: string[] = [
    operations.SQUARE_INLINE,
    operations.DOUBLE_SUBTRACTION,
  ];

  public isOperationExtracted(
    expression: string,
    result: ExtractedOperation
  ): boolean {
    for (const operation of this.availableOperations) {
      let openBrackets = 0;

      for (let i = expression.length - 1; i >= 0; i--) {
        const char: string = expression[i];
        if (char === ")") {
          openBrackets++;
        }
        if (char === "(") {
          openBrackets--;
        }
        if (
          openBrackets === 0 &&
          this.isOperationFound(expression, operation, i)
        ) {
          result.operation = operation;
          result.arguments = this.extractArguments(expression, operation, i);
          return true;
        }
      }
    }
    return false;
  }

  protected isOperationFound(
    expression: string,
    operation: string,
    i: number
  ): boolean {
    if (i === 0) {
      return false;
    }
    if (
      expression.substr(i - operation.length + 1, operation.length) !==
      operation
    ) {
      return false;
    }
    for (const forbidOperation of this.forbidOperations) {
      const possibleOperation1: string = expression.substr(
        i - forbidOperation.length + 1,
        forbidOperation.length
      );
      const possibleOperation2: string = expression.substr(
        i,
        forbidOperation.length
      );
      if (
        possibleOperation1 === forbidOperation ||
        possibleOperation2 === forbidOperation
      ) {
        return false;
      }
    }
    return true;
  }

  public extractArguments(
    expression: string,
    operation: string,
    operationSignPosition: number
  ): string[] {
    const result: string[] = [];
    result[0] = expression.substr(0, operationSignPosition);
    result[1] = expression.substr(operationSignPosition + 1);
    return result;
  }

  public performOperation(operation: string, parameters: number[]): number {
    switch (operation) {
      case operations.POWER:
        return Math.pow(parameters[0], parameters[1]);
      case operations.ADDITION:
        return parameters[0] + parameters[1];
      case operations.SUBTRACTION:
        return parameters[0] - parameters[1];
      case operations.MULTIPLICATION:
        return parameters[0] * parameters[1];
      case operations.DIVISION:
        return parameters[0] / parameters[1];
      default:
        throw new Error("Unsupported operation");
    }
  }
}
