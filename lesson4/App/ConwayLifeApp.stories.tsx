import { ConwayLifeApp } from "./ConwayLifeApp";
import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Conway Life with simple controls",
  component: ConwayLifeApp,
  decorators: [withKnobs],
};

export const app = () => <ConwayLifeApp />;
