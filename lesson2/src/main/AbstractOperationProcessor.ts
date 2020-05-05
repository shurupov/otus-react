import { ExtractedOperation } from "./ExtractedOperation";

export abstract class AbstractOperationProcessor {
  protected abstract availableOperations: string[];

  public abstract isOperationExtracted(
    expression: string,
    result: ExtractedOperation
  ): boolean;

  public abstract performOperation(
    operation: string,
    parameters: number[]
  ): number;
}
