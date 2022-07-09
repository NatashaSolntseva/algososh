import { getFibonacciArr } from "../utils";

describe("fibonacci algorithm test.", () => {
  it("Correctly returns an array of the Fibonacci sequence", () => {
    const resultingArr = [1, 1, 2, 3, 5, 8, 13, 21, 34];
    expect(getFibonacciArr(8)).toStrictEqual(resultingArr);
  });

  it("Correctly returns an array of the Fibonacci sequence for 1", () => {
    const resultingArr = [1, 1];
    expect(getFibonacciArr(1)).toStrictEqual(resultingArr);
  });

  it("CCorrectly returns an array of the Fibonacci sequence for 0", () => {
    const resultingArr = [1];
    expect(getFibonacciArr(0)).toStrictEqual(resultingArr);
  });
});
