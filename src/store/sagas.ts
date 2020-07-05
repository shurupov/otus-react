import { takeEvery, call, put } from "redux-saga/effects";
import { AnyAction } from "redux";
import { changeSetting } from "store/actionCreators";
import { actionTypes } from "store/actioTypes";

export function* workerSagaChangeSettings(action: AnyAction) {
  const data = yield call(changeSetting, action);
  yield put(data);
}

export function* watchSagaChangeSettings() {
  yield takeEvery(actionTypes.SAGA_CHANGE_SETTING, workerSagaChangeSettings);
}
