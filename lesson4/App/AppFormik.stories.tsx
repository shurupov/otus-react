import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { AppFormik } from "./AppFormik";

export default {
  title: "Conway Life with simple controls",
  component: AppFormik,
  decorators: [withKnobs],
};

export const appFormik = () => <AppFormik />;
