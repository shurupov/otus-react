import { StaticApp } from "../src/StaticApp";
import { News } from "pages/News/News";
import React from "react";

export default function news() {
  return <StaticApp renderComponent={() => <News />} />;
}
