import { StaticApp } from "../src/StaticApp";
import { News as NewsComponent } from "pages/News/News";
import React from "react";

export default function news() {
  return <StaticApp page={NewsComponent} />;
}
