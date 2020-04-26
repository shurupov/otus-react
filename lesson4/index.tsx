import React from "react";
import ReactDOM from "react-dom";
import {ConwayLife} from "./ConwayLife/ConwayLife";

const f = (x: number, y: number) => console.log(`(${x}, ${y})`);
ReactDOM.render(<ConwayLife cellSize={10} fieldWidth={20} fieldHeight={20} onClick={f}/>, document.getElementById('root'));