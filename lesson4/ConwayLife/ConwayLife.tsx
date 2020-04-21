import React from "react";
import {Cell} from "./Cell/Cell";

export class ConwayLife extends React.Component {

    constructor(props: Readonly<any>) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <>
            <Cell coloured={true} size={10} />
            <Cell coloured={false} size={10} />
            <Cell coloured={true} size={10} />
            <Cell coloured={false} size={10} />
            <Cell coloured={true} size={10} />
            <Cell coloured={false} size={10} />
            </>;
    }
}