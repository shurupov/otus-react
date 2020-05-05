import React from "react";
import { mount } from "enzyme";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("Render", () => {
    const wrapper = mount(
      <Cell
        coloured={true}
        onClick={() => true}
        size={10}
        animationDelay={50}
      />
    );
    expect(wrapper.props().coloured).toBe(true);
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
      <Cell coloured={true} onClick={onClick} size={10} animationDelay={50} />
    );
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
