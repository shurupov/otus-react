import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { ConwayLifeAppFormik } from "./ConwayLifeAppFormik";

export default {
  title: "Conway Life with simple controls",
  component: ConwayLifeAppFormik,
  decorators: [withKnobs],
};

export const appFormik = () => <ConwayLifeAppFormik />;
