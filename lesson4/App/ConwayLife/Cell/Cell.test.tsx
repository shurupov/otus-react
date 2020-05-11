import React from "react";
import { mount } from "enzyme";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("Render", () => {
    const wrapper = mount(
      <Cell
        alive={true}
        onClick={() => true}
        size={10}
        stepsCount={4}
        animated={false}
        step={0}
      />
    );
    expect(wrapper.props().alive).toBe(true);
    expect(wrapper.props().size).toBe(10);
    expect(wrapper.getDOMNode().tagName.toLowerCase()).toBe("div");
    expect(wrapper.getDOMNode().attributes.length).toBe(2);
    const style = wrapper.getDOMNode().getAttribute("style");
    expect(style).not.toBeNull();
    expect(style !== null && style.length).toBeGreaterThan(0);
    expect(wrapper.getDOMNode().className).toBe("cell");
  });
  it("click", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Cell
        alive={true}
        onClick={onClick}
        size={10}
        step={0}
        animated={false}
        stepsCount={4}
      />
    );
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
