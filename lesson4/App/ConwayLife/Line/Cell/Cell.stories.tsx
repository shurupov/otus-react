import { Cell } from "./Cell";
import React from "react";
import { boolean, number, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Cell",
  component: Cell,
  decorators: [withKnobs],
};

function f() {
  console.log("clicked");
}

export const customCell = () => (
  <Cell
    alive={boolean("alive", true)}
    size={number("size", 100)}
    onClick={f}
    step={number("step", 0)}
    animated={boolean("animated", false)}
  />
);
