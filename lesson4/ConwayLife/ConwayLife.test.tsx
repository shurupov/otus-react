import {ConwayLife} from "./ConwayLife";
import React from "react";



describe("ConwayLife.getNextGeneration", () => {
    it("getNextGeneration 1", () => {
        const conwayLife: ConwayLife = <ConwayLife cellSize={10} fieldWidth={5} fieldHeight={5}/>;
        const oldField: Array<Array<boolean>> = [
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ];
        expect(conwayLife.getNextGeneration(oldField, 1,1)).toEqual(false);
    });

});