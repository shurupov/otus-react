import {ConwayLife} from "./ConwayLife";
import React from "react";

export default {
    title: 'Conway Life',
    component: ConwayLife
}

export const conway5x5 = () => <ConwayLife fieldWidth={5} fieldHeight={5} cellSize={10}/>;
export const conway30x30 = () => <ConwayLife fieldWidth={30} fieldHeight={30} cellSize={10}/>;
export const conway30x30WithBigCells = () => <ConwayLife fieldWidth={30} fieldHeight={30} cellSize={20}/>;
export const conway60x60 = () => <ConwayLife fieldWidth={60} fieldHeight={60} cellSize={10}/>;
export const conway120x120 = () => <ConwayLife fieldWidth={120} fieldHeight={120} cellSize={4}/>;