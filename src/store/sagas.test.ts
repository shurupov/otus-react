import { workerSagaChangeSettings } from "store/sagas";
import { actionTypes } from "store/reducer";
import { changeSetting, sagaChangeSetting } from "store/actionCreators";
import { call, put } from "redux-saga/effects";

test("sagas", () => {
  const action1 = {
    type: actionTypes.SAGA_CHANGE_SETTING,
    payload: "test",
  };
  const action2 = {
    ...action1,
    type: actionTypes.CHANGE_SETTING,
  };
  const saga1 = workerSagaChangeSettings(changeSetting("someField", 2));
  const next1 = saga1.next();
  expect(next1).toEqual({
    value: call(changeSetting, "someField", 2),
    done: false,
  });
  const next2 = saga1.next(action2);
  expect(next2).toEqual({
    value: put(sagaChangeSetting("someField", 2)),
    done: false,
  });
  const next3 = saga1.next();
  expect(next3).toEqual({ value: undefined, done: true });
});
