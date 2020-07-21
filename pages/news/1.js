import { StaticApp } from "../../src/StaticApp";
import { NewsText } from "pages/News/NewsText/NewsText";
import React from "react";

export default function news1() {
  return (
    <StaticApp page={NewsText} props={{ match: { params: { newsid: 1 } } }} />
  );
}
