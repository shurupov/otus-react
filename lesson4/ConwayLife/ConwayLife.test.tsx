import {ConwayLife} from "./ConwayLife";
import React from "react";



describe("ConwayLife", () => {
    it("getNextGeneration", () => {
        const conwayLife: ConwayLife = new ConwayLife({cellSize: 10, fieldWidth: 4, fieldHeight: 4}); // <ConwayLife cellSize={10} fieldWidth={5} fieldHeight={5}/>;
        const oldField: Array<Array<boolean>> = [
            [false, true, false, true],
            [false, true, false, true],
            [true, false, true, false],
            [true, false, true, false]
        ];
        expect(conwayLife.getNextGeneration(oldField, 0,0)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 0,1)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 0,2)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 0,3)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 1,0)).toEqual(true);
        expect(conwayLife.getNextGeneration(oldField, 1,1)).toEqual(true);
        expect(conwayLife.getNextGeneration(oldField, 1,2)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 1,3)).toEqual(true);
        expect(conwayLife.getNextGeneration(oldField, 2,0)).toEqual(true);
        expect(conwayLife.getNextGeneration(oldField, 2,1)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 2,2)).toEqual(true);
        expect(conwayLife.getNextGeneration(oldField, 2,3)).toEqual(true);
        expect(conwayLife.getNextGeneration(oldField, 3,0)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 3,1)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 3,2)).toEqual(false);
        expect(conwayLife.getNextGeneration(oldField, 3,3)).toEqual(false);
    });

});