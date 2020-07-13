import { testSaga } from "redux-saga-test-plan";
import {
  workerSagaInit,
  settingsSelector,
  initField,
  workerSagaUpdate,
  fieldSelector,
  process,
} from "smart/ConwayLife/saga";
import { conwayFieldSlice } from "smart/ConwayLife/slice";

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
});
