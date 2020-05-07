import { App } from "./App";
import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Conway Life with simple controls",
  component: App,
  decorators: [withKnobs],
};

export const app = () => <App />;
