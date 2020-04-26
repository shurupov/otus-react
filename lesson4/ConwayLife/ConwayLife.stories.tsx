import {ConwayLife} from "./ConwayLife";
import React from "react";
import {number, withKnobs} from "@storybook/addon-knobs";

export default {
    title: 'Conway Life',
    component: ConwayLife,
    decorators: [withKnobs]
}

const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

export const conway5x5 = () => <ConwayLife fieldWidth={5} fieldHeight={5} cellSize={10} onClick={f} cellAnimationDelay={50}/>;
export const conway30x30 = () => <ConwayLife fieldWidth={30} fieldHeight={30} cellSize={10} onClick={f} cellAnimationDelay={50}/>;
export const conway30x30WithBigCells = () => <ConwayLife fieldWidth={30} fieldHeight={30} cellSize={20} onClick={f} cellAnimationDelay={50}/>;
export const conway60x60 = () => <ConwayLife fieldWidth={60} fieldHeight={60} cellSize={10} onClick={f} cellAnimationDelay={50}/>;
export const conway120x120 = () => <ConwayLife fieldWidth={120} fieldHeight={120} cellSize={4} onClick={f} cellAnimationDelay={50}/>;
export const customConway = () => <ConwayLife fieldWidth={number("field width", 30)} fieldHeight={number("field height", 30)} cellSize={number("cell size", 10)} onClick={f} cellAnimationDelay={50}/>;
