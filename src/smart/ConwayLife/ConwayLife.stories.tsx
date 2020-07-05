import { ConwayLife } from "./ConwayLife";
import React from "react";
import { number, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Conway Life",
  component: ConwayLife,
  decorators: [withKnobs],
};

export const customConway = () => (
  <ConwayLife
    fieldWidth={number("field width", 30)}
    fieldHeight={number("field height", 30)}
    cellSize={number("cell size", 10)}
    animationDelay={number("animation delay", 50)}
    alivePercent={number("alive percent", 30)}
    animationStepsCount={number("animation steps count", 4)}
    reinitField
  />
);
