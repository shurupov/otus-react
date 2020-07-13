import { expectSaga, testSaga } from "redux-saga-test-plan";
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
    reinitField: false,
    initialized: false,
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
  /*it("Login saga integration test", () => {
    const expectedFinalStoreState = {
      ...initialState,
      user: {
        id: 5,
        username: "Bob",
        first: "Bob",
        last: "Lastname",
      },
    };
    return expectSaga(workerSagaLogin, sagaLoginAction("Bob"))
      .withReducer(reducer, { ...initialState })
      .hasFinalState(expectedFinalStoreState)
      .run();
  });*/
  it("Conway init update test", () => {
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
