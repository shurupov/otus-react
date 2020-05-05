import { ConwayLife } from "./ConwayLife";
import React from "react";
import { number, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Conway Life",
  component: ConwayLife,
  decorators: [withKnobs],
};

const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

export const customConway = () => (
  <ConwayLife
    fieldWidth={number("field width", 30)}
    fieldHeight={number("field height", 30)}
    cellSize={number("cell size", 10)}
    onClick={f}
    animationDelay={number("animation delay", 500)}
  />
);
