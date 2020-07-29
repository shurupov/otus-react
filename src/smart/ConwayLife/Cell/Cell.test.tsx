import React from "react";
import { mount } from "enzyme";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("Render", () => {
    const wrapper = mount(
      <Cell alive={true} size={10} stepsCount={4} animated={false} step={0} />
    );
    expect(wrapper.props().alive).toBe(true);
    expect(wrapper.props().size).toBe(10);
    expect(wrapper.getDOMNode().tagName.toLowerCase()).toBe("div");
    expect(wrapper.getDOMNode().attributes.length).toBe(1);
    const style = wrapper.getDOMNode().getAttribute("style");
    expect(style).toBeNull();
    expect(wrapper.getDOMNode().className.length).toBeGreaterThan(4);
    expect(wrapper.getDOMNode().className.substr(0, 4)).toBe("cell");
  });
});
