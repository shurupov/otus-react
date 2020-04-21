import React from "react";
import ReactDOM from "react-dom";
import {ConwayLife} from "./ConwayLife/ConwayLife";

ReactDOM.render(<ConwayLife cellSize={10} fieldWidth={30} fieldHeight={30}/>, document.getElementById('root'));