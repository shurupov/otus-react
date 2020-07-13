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

  it("Conway init changeSetting test with reinit", () => {
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

  it("Conway init changeSetting test without reinit", () => {
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
});
