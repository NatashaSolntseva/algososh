import renderer from "react-test-renderer";

import { Circle } from "../circle";

import { ElementStates } from "../../../../types/element-states";

const circleText = "Run Jest";

describe("checking circle with snapshots.", () => {
  it("circle should be rendered without text", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle should be rendered with text", () => {
    const tree = renderer.create(<Circle circleText={circleText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle with head shoud be rendered", () => {
    const tree = renderer.create(<Circle head="3" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle with react-element in head shoud be rendered", () => {
    const tree = renderer
      .create(<Circle head={<Circle isSmall={true} />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle with tail shoud be rendered", () => {
    const tree = renderer.create(<Circle tail="3" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle with react-element in tail shoud be rendered", () => {
    const tree = renderer
      .create(<Circle tail={<Circle isSmall={true} />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle with index shoud be rendered", () => {
    const tree = renderer.create(<Circle index="2" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle with isSmall props ===  true shoud be rendered", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle in default state shoud be rendered", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle in changing state shoud be rendered", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("circle in modified state shoud be rendered", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
