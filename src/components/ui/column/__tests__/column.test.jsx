import renderer from "react-test-renderer";

import { Column } from "../column";

import { ElementStates } from "../../../../types/element-states";

describe("checking column with snapshots.", () => {
  it("column should be rendered", () => {
    const tree = renderer.create(<Column />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("column in default state shoud be rendered", () => {
    const tree = renderer
      .create(<Column state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("column in changing state shoud be rendered", () => {
    const tree = renderer
      .create(<Column state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("column in modified state shoud be rendered", () => {
    const tree = renderer
      .create(<Column state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
