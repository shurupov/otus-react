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

export const customCell = () => <Cell coloured={boolean("coloured", true)} size={number("size", 100)} onClick={f} animationDelay={number("animationDelay", 100)}/>;