import { ElementStates } from "../../../types/element-states";
import { bubbleSortingAlgo, selectionSortingAlgo } from "../utils";

describe("bubble sorting algorithm test.", () => {
  let testingArr = [];

  beforeEach(() => {
    testingArr = [
      { number: 2, state: ElementStates.Default },
      { number: 3, state: ElementStates.Default },
      { number: 9, state: ElementStates.Default },
      { number: 5, state: ElementStates.Default },
      { number: 0, state: ElementStates.Default },
      { number: 6, state: ElementStates.Default },
    ];
  });

  it("Correctly sorts an array of multiple elements in ascending order", () => {
    const resultingArr = [
      { number: 0, state: ElementStates.Modified },
      { number: 2, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
      { number: 6, state: ElementStates.Modified },
      { number: 9, state: ElementStates.Modified },
    ];
    expect(
      bubbleSortingAlgo("ascending", testingArr).stepResArray
    ).toStrictEqual(resultingArr);
  });

  it("Correctly sorts an array of multiple elements in descending order", () => {
    const resultingArr = [
      { number: 9, state: ElementStates.Modified },
      { number: 6, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 2, state: ElementStates.Modified },
      { number: 0, state: ElementStates.Modified },
    ];
    expect(
      bubbleSortingAlgo("descending", testingArr).stepResArray
    ).toStrictEqual(resultingArr);
  });

  it("Correctly sorts an empty array", () => {
    const resultingArr = [];
    expect(bubbleSortingAlgo("ascending", []).stepResArray).toStrictEqual(
      resultingArr
    );
  });

  it("Correctly sorts an array of one element", () => {
    const resultingArr = [{ number: 2, state: ElementStates.Modified }];
    expect(
      bubbleSortingAlgo("ascending", [
        { number: 2, state: ElementStates.Default },
      ]).stepResArray
    ).toStrictEqual(resultingArr);
  });
});

describe("selection sorting algorithm test.", () => {
  let testingArr = [];

  beforeEach(() => {
    testingArr = [
      { number: 2, state: ElementStates.Default },
      { number: 3, state: ElementStates.Default },
      { number: 9, state: ElementStates.Default },
      { number: 5, state: ElementStates.Default },
      { number: 0, state: ElementStates.Default },
      { number: 6, state: ElementStates.Default },
    ];
  });

  it("Correctly sorts an array of multiple elements in ascending order", () => {
    const resultingArr = [
      { number: 0, state: ElementStates.Modified },
      { number: 2, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
      { number: 6, state: ElementStates.Modified },
      { number: 9, state: ElementStates.Modified },
    ];
    expect(
      selectionSortingAlgo("ascending", testingArr).stepResArray
    ).toStrictEqual(resultingArr);
  });

  it("Correctly sorts an array of multiple elements in descending orderg", () => {
    const resultingArr = [
      { number: 9, state: ElementStates.Modified },
      { number: 6, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 2, state: ElementStates.Modified },
      { number: 0, state: ElementStates.Modified },
    ];
    expect(
      selectionSortingAlgo("descending", testingArr).stepResArray
    ).toStrictEqual(resultingArr);
  });

  it("Correctly sorts an empty array", () => {
    const resultingArr = [];
    expect(selectionSortingAlgo("ascending", []).stepResArray).toStrictEqual(
      resultingArr
    );
  });

  it("Correctly sorts an array of one element", () => {
    const resultingArr = [{ number: 2, state: ElementStates.Modified }];
    expect(
      selectionSortingAlgo("ascending", [
        { number: 2, state: ElementStates.Default },
      ]).stepResArray
    ).toStrictEqual(resultingArr);
  });
});
