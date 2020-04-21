import {Line} from "./Line";
import React from "react";

export default {
    title: 'Line of Cells',
    component: Line,
};

export const lineOfFive = () => <Line cells={[true, false, true, false, true]} cellSize={10}/>;
export const lineOfTen = () => <Line cells={[true, false, true, false, true, false, true, false, true, false]} cellSize={10}/>;