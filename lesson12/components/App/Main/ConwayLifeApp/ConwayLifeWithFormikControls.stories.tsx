import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { ConwayLifeWithFormikControls } from "./ConwayLifeWithFormikControls";

export default {
  title: "Conway Life with simple controls",
  component: ConwayLifeWithFormikControls,
  decorators: [withKnobs],
};

export const appFormik = () => <ConwayLifeWithFormikControls />;
