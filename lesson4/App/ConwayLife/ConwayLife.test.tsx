import { ConwayLife } from "./ConwayLife";
import React from "react";
import { mount } from "enzyme";

describe("ConwayLife", () => {
  it("getNextGeneration", () => {
    const conwayLife: ConwayLife = new ConwayLife({
      cellSize: 10,
      fieldWidth: 4,
      fieldHeight: 4,
      onClick: () => true,
      animationDelay: 50,
    }); // <ConwayLife cellSize={10} fieldWidth={5} fieldHeight={5}/>;
    const oldField: Array<Array<boolean>> = [
      [false, true, false, true],
      [false, true, false, true],
      [true, false, true, false],
      [true, false, true, false],
    ];
    expect(conwayLife.getNextGeneration(oldField, 0, 0)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 0, 1)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 0, 2)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 0, 3)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 1, 0)).toEqual(true);
    expect(conwayLife.getNextGeneration(oldField, 1, 1)).toEqual(true);
    expect(conwayLife.getNextGeneration(oldField, 1, 2)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 1, 3)).toEqual(true);
    expect(conwayLife.getNextGeneration(oldField, 2, 0)).toEqual(true);
    expect(conwayLife.getNextGeneration(oldField, 2, 1)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 2, 2)).toEqual(true);
    expect(conwayLife.getNextGeneration(oldField, 2, 3)).toEqual(true);
    expect(conwayLife.getNextGeneration(oldField, 3, 0)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 3, 1)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 3, 2)).toEqual(false);
    expect(conwayLife.getNextGeneration(oldField, 3, 3)).toEqual(false);
  });

  it("process", () => {
    const conwayLife: ConwayLife = new ConwayLife({
      cellSize: 10,
      fieldWidth: 4,
      fieldHeight: 4,
      onClick: () => true,
      animationDelay: 50,
    }); // <ConwayLife cellSize={10} fieldWidth={5} fieldHeight={5}/>;
    const oldField: Array<Array<boolean>> = [
      [false, true, false, true],
      [false, true, false, true],
      [true, false, true, false],
      [true, false, true, false],
    ];
    const newField: Array<Array<boolean>> = [
      [false, false, false, false],
      [true, true, false, true],
      [true, false, true, true],
      [false, false, false, false],
    ];
    expect(conwayLife.process(oldField)).toStrictEqual(newField);
  });

  it("render", () => {
    const f = (x: number, y: number) => console.log(`(${x}, ${y})`);
    let wrapper = mount(
      <ConwayLife
        fieldWidth={10}
        fieldHeight={10}
        cellSize={10}
        onClick={f}
        animationDelay={50}
      />
    );
    expect(wrapper.find(".line").length).toBe(10);
    expect(wrapper.find(".cell").length).toBe(100);
    expect(wrapper.find(".conway-life").length).toBe(1);
    wrapper = mount(
      <ConwayLife
        fieldWidth={5}
        fieldHeight={5}
        cellSize={10}
        onClick={f}
        animationDelay={50}
      />
    );
    expect(wrapper.find(".line").length).toBe(5);
    expect(wrapper.find(".cell").length).toBe(25);
    wrapper = mount(
      <ConwayLife
        fieldWidth={6}
        fieldHeight={8}
        cellSize={10}
        onClick={f}
        animationDelay={50}
      />
    );
    expect(wrapper.find(".line").length).toBe(8);
    expect(wrapper.find(".cell").length).toBe(48);
  });

  it("click", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <ConwayLife
        fieldWidth={10}
        fieldHeight={10}
        cellSize={10}
        onClick={onClick}
        animationDelay={50}
      />
    );
    wrapper.find(".cell").first().simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});