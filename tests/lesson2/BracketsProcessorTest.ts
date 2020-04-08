import {BracketsProcessor} from "../../src/lesson2/BracketsProcessor";

describe("Calculator inBrackets method", () => {
    it("Check brackets (5)", () => {
        expect(BracketsProcessor.isInBrackets("(5)")).toEqual(true);
    });
    it("Check brackets (5 + 6)", () => {
        expect(BracketsProcessor.isInBrackets("(5 + 6)")).toEqual(true);
    });
    it("Check brackets (5 + 6) * 7", () => {
        expect(BracketsProcessor.isInBrackets("(5 + 6) * 7")).toEqual(false);
    });
    it("Check brackets (5 + 6) * (7 + 8)", () => {
        expect(BracketsProcessor.isInBrackets("(5 + 6) * (7 + 8)")).toEqual(false);
    });
});

describe("Calculator openBrackets method", () => {
    it("Open brackets (5)", () => {
        expect(BracketsProcessor.openBrackets("(5)")).toEqual("5");
    });
    it("Open brackets (5 + 6)", () => {
        expect(BracketsProcessor.openBrackets("(5 + 6)")).toEqual("5 + 6");
    });
});