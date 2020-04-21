import {Cell} from "./Cell";
import React from "react";
import {boolean, number, withKnobs} from "@storybook/addon-knobs";

export default {
    title: 'Cell',
    component: Cell,
    decorators: [withKnobs]
};

function f() {
    console.log("clicked");
}

export const colouredCell = () => <Cell coloured={true} size={10} onClick={f}/>;
export const emptyCell = () => <Cell coloured={false} size={10} onClick={f}/>;
export const bigColouredCell = () => <Cell coloured={true} size={20} onClick={f}/>;
export const bigEmptyCell = () => <Cell coloured={false} size={20} onClick={f}/>;
export const customCell = () => <Cell coloured={boolean("coloured", true)} size={number("size", 20)} onClick={f}/>;