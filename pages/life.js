import { StaticApp } from "../src/StaticApp";
import React from "react";

export default function index() {
  return <StaticApp renderComponent={() => <h1>Root</h1>} />;
}
