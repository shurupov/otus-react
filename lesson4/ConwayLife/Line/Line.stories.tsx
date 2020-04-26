import {Line} from "./Line";
import React from "react";
import {boolean, number, withKnobs} from "@storybook/addon-knobs";

export default {
    title: 'Line of Cells',
    component: Line,
    decorators: [withKnobs]
};

function f() {
    console.log("clicked");
}

export const lineOfTen = () => <Line cells={[true, false, true, false, true, false, true, false, true, false]} onClick={f} cellSize={number("cellSize", 20)} cellAnimationDelay={50}/>;
export const customLine = () => <Line
    cells={[boolean("cells[0]", true), boolean("cells[1]", true), boolean("cells[2]", true), boolean("cells[3]", true), boolean("cells[4]", true)]}
    onClick={f}
    cellSize={number("cellSize", 20)}
    cellAnimationDelay={number("cellAnimationDelay", 50)}
/>;