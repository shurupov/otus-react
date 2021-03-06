import { createInterface } from "readline";
import { ReversePolishNotationCalculator } from "./ReversePolishNotationCalculator";

const commandLineHandler = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const calculator: ReversePolishNotationCalculator = new ReversePolishNotationCalculator();

const question = (): Promise<null> =>
  new Promise((resolve) => {
    commandLineHandler.question("> ", (answer: string) => {
      console.log(calculator.calcExpression(answer));
      resolve();
    });
  });

async function app(): Promise<null> {
  while (true) {
    await question();
  }
}

app();
