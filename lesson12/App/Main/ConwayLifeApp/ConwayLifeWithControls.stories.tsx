import { ConwayLifeWithControls } from "./ConwayLifeWithControls";
import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Conway Life with simple controls",
  component: ConwayLifeWithControls,
  decorators: [withKnobs],
};

export const app = () => <ConwayLifeWithControls />;
