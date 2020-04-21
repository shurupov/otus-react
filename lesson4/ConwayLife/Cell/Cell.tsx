import React from "react";

interface CellProps {
    coloured: boolean,
    size: number
}

export class Cell extends React.Component<CellProps, any>{

    private coloured: boolean;
    private size: number;

    constructor(props: CellProps) {
        super(props);
        this.coloured = props.coloured;
        this.size = props.size;
    }

    private getBackgroundColor(): string {
        if (this.coloured) {
            return "#000000";
        } else {
            return "#ffffff";
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div style={{
            width: this.size,
            height: this.size,
            backgroundColor: this.getBackgroundColor(),
            marginRight: 1,
            marginTop: 1,
            float: "left"
        }}/>
    }
}