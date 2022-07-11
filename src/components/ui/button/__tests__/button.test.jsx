import { render, screen, fireEvent } from "@testing-library/react";

import renderer from "react-test-renderer";

import { Button } from "../button";

const buttonText = "Run Jest";

const alertText = "rendered ok";

describe("checking button with snapshots.", () => {
  it("button should be rendered with text", () => {
    const tree = renderer.create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("button should be rendered without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("disabled button should be rendered", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("button should be rendered with loader", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("checking button event listener", () => {
  it("click on button works and callback is ok", () => {
    window.alert = jest.fn();

    render(
      <Button
        text={buttonText}
        onClick={() => {
          alert(alertText);
        }}
      />
    );

    const button = screen.getByText(buttonText);

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(alertText);
  });

  it("click on button works", () => {
    const fn = jest.fn();
    render(<Button text={buttonText} onClick={fn} />);

    const button = screen.getByText(buttonText);

    fireEvent.click(button);
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
