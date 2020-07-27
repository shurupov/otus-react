import { expectSaga, RunResult, testSaga } from "redux-saga-test-plan";
import {
  workerSagaInit,
  settingsSelector,
  initField,
  workerSagaUpdate,
  fieldSelector,
  process,
  workerSagaChangeSetting,
  changeSettingAction,
  reinitAction,
  previous,
  compareWithPrevious,
  fieldsEqual,
} from "smart/ConwayLife/saga";
import { conwayFieldSlice, conwaySettingsSlice } from "smart/ConwayLife/slice";
import { reducer, StoreState } from "store/reducer";
import { PoorCellProps } from "smart/ConwayLife/Cell/Cell";

const initialState: StoreState = {
  conwayField: [],
  user: {
    id: null,
    username: "",
    first: "",
    last: "",
  },
  conwaySettings: {
    fieldWidth: 20,
    fieldHeight: 20,
    cellSize: 10,
    animationDelay: 50,
    alivePercent: 30,
    animationStepsCount: 4,
  },
};

function boolToCell(alive: boolean): PoorCellProps {
  return {
    alive,
    step: 0,
    animated: true,
  };
}

function boolArrayToCellArray(
  boolsTable: Array<Array<boolean>>
): Array<Array<PoorCellProps>> {
  const result: Array<Array<PoorCellProps>> = [];
  for (let i = 0; i < boolsTable.length; i++) {
    result[i] = [];
    for (let j = 0; j < boolsTable[i].length; j++) {
      result[i][j] = boolToCell(boolsTable[i][j]);
    }
  }
  return result;
}

describe("Conway saga", () => {
  it("Conway init unit test", () => {
    testSaga(workerSagaInit)
      .next()
      .select(settingsSelector)
      .next({})
      .call(initField, {})
      .next({})
      .put(conwayFieldSlice.actions.update({}))
      .next()
      .isDone();
  });

  it("Conway init integration test", () => {
    return expectSaga(workerSagaInit)
      .withReducer(reducer, { ...initialState })
      .run()
      .then((result) => {
        const state: StoreState = result.storeState;
        expect(state.conwayField.length).toBe(state.conwaySettings.fieldHeight);
        expect(state.conwayField[0].length).toBe(
          state.conwaySettings.fieldWidth
        );
      });
  });

  it("Conway update unit test", () => {
    testSaga(workerSagaUpdate)
      .next()
      .select(settingsSelector)
      .next({})
      .select(fieldSelector)
      .next({})
      .call(process, {}, {})
      .next({})
      .put(conwayFieldSlice.actions.update({}))
      .next()
      .isDone();
  });

  it("Conway update integration test", () => {
    return expectSaga(workerSagaUpdate)
      .withReducer(reducer, {
        ...initialState,
        conwaySettings: {
          fieldWidth: 4,
          fieldHeight: 4,
          cellSize: 10,
          animationDelay: 50,
          alivePercent: 30,
          animationStepsCount: 4,
        },
        conwayField: [
          [false, true, false, true],
          [false, true, false, true],
          [true, false, true, false],
          [true, false, true, false],
        ].map((l) =>
          l.map((c) => {
            return {
              alive: c,
              step: 0,
              animated: false,
            };
          })
        ),
      })
      .run()
      .then((result: RunResult) => {
        const state: StoreState = result.storeState;
        expect(
          state.conwayField.map((l: Array<PoorCellProps>) =>
            l.map((c) => c.alive)
          )
        ).toEqual([
          [false, false, false, false],
          [true, true, false, true],
          [true, false, true, true],
          [false, false, false, false],
        ]);
      });
  });

  it("Conway changeSetting test with reinit unit test", () => {
    testSaga(workerSagaChangeSetting, changeSettingAction("fieldHeight", 15))
      .next()
      .put(
        conwaySettingsSlice.actions.changeSetting({
          field: "fieldHeight",
          value: 15,
        })
      )
      .next({})
      .put(reinitAction())
      .next()
      .isDone();
  });

  it("Conway changeSetting integration test", () => {
    return expectSaga(
      workerSagaChangeSetting,
      changeSettingAction("fieldHeight", 15)
    )
      .withReducer(reducer, { ...initialState })
      .run(500)
      .then((result) => {
        const state: StoreState = result.storeState;
        expect(state.conwaySettings.fieldHeight).toBe(15);
      });
  });

  it("Conway unit changeSetting test without reinit", () => {
    testSaga(workerSagaChangeSetting, changeSettingAction("cellSize", 15))
      .next()
      .put(
        conwaySettingsSlice.actions.changeSetting({
          field: "cellSize",
          value: 15,
        })
      )
      .next()
      .isDone();
  });

  it("compareWithPrevious", () => {
    const cells = boolArrayToCellArray([
      [true, true, false],
      [true, false, true],
      [false, false, false],
    ]);
    while (previous.length) {
      previous.pop();
    }
    previous.push(cells);
    expect(compareWithPrevious(cells)).toBe(true);
  });

  it("fieldsEqual", () => {
    const cells = boolArrayToCellArray([
      [true, true, false],
      [true, false, true],
      [false, false, false],
    ]);
    expect(fieldsEqual(cells, cells)).toBe(true);
  });
});
