import { Cell } from "./Cell";
import React from "react";
import { boolean, number, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Cell",
  component: Cell,
  decorators: [withKnobs],
};

export const customCell = () => (
  <Cell
    alive={boolean("alive", true)}
    size={number("size", 100)}
    step={number("step", 0)}
    animated={boolean("animated", false)}
    stepsCount={4}
  />
);
