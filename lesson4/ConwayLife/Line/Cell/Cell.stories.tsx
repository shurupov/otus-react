import {Cell} from "./Cell";
import React from "react";

export default {
    title: 'Cell',
    component: Cell,
};

export const colouredCell = () => <Cell coloured={true} size={10}/>;
export const emptyCell = () => <Cell coloured={false} size={10}/>;
export const bigColouredCell = () => <Cell coloured={true} size={20}/>;
export const bigEmptyCell = () => <Cell coloured={false} size={20}/>;