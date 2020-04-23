import {mount} from "enzyme";
import React from "react";
import {Line} from "./Line";

describe("Line", () => {
    it("Render", () => {
        const cells1 = [true, false, true, false, true, false, true, false, true, false];
        const cells2 = [true, false, true];
        let wrapper = mount(<Line cells={cells1} cellSize={10} onClick={() => {}} />);
        expect(wrapper.getDOMNode().className).toBe("line");
        expect(wrapper.getDOMNode().getAttribute("style")).toBe("clear: both;");
        expect(wrapper.find(".cell").length).toBe(10);
        wrapper = mount(<Line cells={cells2} cellSize={10} onClick={() => {}} />);
        expect(wrapper.find(".cell").length).toBe(3);
    });
    it("click", () => {
        const onClick = jest.fn();
        const wrapper = mount(<Line cells={[true, false]} cellSize={10} onClick={onClick} />);
        wrapper.find(".cell").first().simulate("click");
        expect(onClick).toHaveBeenCalled();
    });
});