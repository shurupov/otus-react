import {Line} from "./Line";
import React from "react";
import {boolean, withKnobs} from "@storybook/addon-knobs";

export default {
    title: 'Line of Cells',
    component: Line,
    decorators: [withKnobs]
};

function f() {
    console.log("clicked");
}

export const lineOfFive = () => <Line cells={[true, true, true, true, true]} cellSize={10} onClick={f}/>;
export const lineOfTen = () => <Line cells={[true, false, true, false, true, false, true, false, true, false]} onClick={f} cellSize={10}/>;
export const customLine = () => <Line cells={[boolean("cells[0]", true), boolean("cells[1]", true), boolean("cells[2]", true), boolean("cells[3]", true), boolean("cells[4]", true)]} onClick={f} cellSize={20}/>;