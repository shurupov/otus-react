import { workerSagaChangeSettings } from "store/sagas";
import { changeSetting, sagaChangeSetting } from "store/actionCreators";
import { call, put } from "redux-saga/effects";

test("sagas", () => {
  const saga1 = workerSagaChangeSettings(sagaChangeSetting("someField", 2));
  const next1 = saga1.next();
  expect(next1).toEqual({
    value: call(changeSetting, "someField", 2),
    done: false,
  });
  const next2 = saga1.next(changeSetting("someField", 2));
  expect(next2).toEqual({
    value: put(changeSetting("someField", 2)),
    done: false,
  });
  const next3 = saga1.next();
  expect(next3).toEqual({ value: undefined, done: true });
});
