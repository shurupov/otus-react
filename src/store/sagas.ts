import { takeEvery, call, put } from "redux-saga/effects";
import { actionTypes } from "store/reducer";
import { AnyAction } from "redux";
import { changeSetting } from "store/actionCreators";

function* workerSagaChangeSettings(action: AnyAction) {
  const data = yield call(changeSetting, action);
  yield put(data);
}

export function* watchSagaChangeSettings() {
  yield takeEvery(actionTypes.SAGA_CHANGE_SETTING, workerSagaChangeSettings);
}
