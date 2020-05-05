import { BracketsProcessor } from "./BracketsProcessor";
import { TwoArgumentsProcessor } from "./TwoArgumentsProcessor";
import { RightOperationProcessor } from "./RightOperationProcessor";
import { ExtractedOperation } from "./ExtractedOperation";
import { operations } from "./operations";
import { AbstractOperationProcessor } from "./AbstractOperationProcessor";
import { BracketsOperationProcessor } from "./BracketsOperationProcessor";
import { LeftOperationProcessor } from "./LeftOperationProcessor";

export class Calculator {
  private processors: AbstractOperationProcessor[] = [
    new BracketsProcessor(),
    new TwoArgumentsProcessor(),
    new LeftOperationProcessor(),
    new RightOperationProcessor(),
    new BracketsOperationProcessor(),
  ];

  public calculate(expression: string): number {
    expression = expression.trim();
    //console.log(expression);

    for (const processor of this.processors) {
      const operation: ExtractedOperation = {
        operation: operations.UNSUPPORTED_OPERATION,
        arguments: [],
      };
      if (processor.isOperationExtracted(expression, operation)) {
        const calculatedArguments: number[] = operation.arguments.map(
          (argument: string) => this.calculate(argument)
        );
        //console.log(operation.operation, calculatedArguments);
        return processor.performOperation(
          operation.operation,
          calculatedArguments
        );
      }
    }

    return parseFloat(expression);
  }
}
