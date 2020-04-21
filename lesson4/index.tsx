import React from "react";
import ReactDOM from "react-dom";
import {ConwayLife} from "./ConwayLife/ConwayLife";

//const conwayLife: ConwayLife = <ConwayLife cellSize={10} fieldWidth={5} fieldHeight={5}/>;

ReactDOM.render(<ConwayLife cellSize={10} fieldWidth={20} fieldHeight={20}/>, document.getElementById('root'));

//setTimeout(() => { conwayLife.tick(); }, 1000);