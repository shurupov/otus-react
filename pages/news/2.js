import { StaticApp } from "../../src/StaticApp";
import { NewsText } from "pages/News/NewsText/NewsText";
import React from "react";

export default function news2() {
  return (
    <StaticApp page={NewsText} props={{ match: { params: { newsid: 2 } } }} />
  );
}
