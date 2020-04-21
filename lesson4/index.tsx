import React from "react";
import ReactDOM from "react-dom";
import {ConwayLife} from "./ConwayLife/ConwayLife";

//const conwayLife: ConwayLife = <ConwayLife cellSize={10} fieldWidth={5} fieldHeight={5}/>;

ReactDOM.render(<ConwayLife cellSize={10} fieldWidth={60} fieldHeight={60}/>, document.getElementById('root'));

//setTimeout(() => { conwayLife.tick(); }, 1000);