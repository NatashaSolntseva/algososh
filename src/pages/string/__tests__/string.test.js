import { getReversingStringSteps } from "../utils";

const resultForEvenSymbols = [
  ["1", "2", "3", "4"],
  ["4", "2", "3", "1"],
  ["4", "3", "2", "1"],
];

const resultForOddSymbols = [
  ["1", "2", "3", "4", "5"],
  ["5", "2", "3", "4", "1"],
  ["5", "4", "3", "2", "1"],
];

describe("string reversal algorithm test", () => {
  it("Expands the string correctly with an even number of characters, return arr of steps.", () => {
    expect(getReversingStringSteps("1234")).toEqual(resultForEvenSymbols);
  });

  it("Expands the string correctly with an odd number of characters, return arr of steps.", () => {
    expect(getReversingStringSteps("12345")).toEqual(resultForOddSymbols);
  });

  it("Expands the string correctly with an one character, return arr of steps.", () => {
    expect(getReversingStringSteps("A")).toEqual([["A"]]);
  });

  it("Expands the string correctly with an empty string, return arr of steps.", () => {
    expect(getReversingStringSteps("")).toEqual([[]]);
  });
});
