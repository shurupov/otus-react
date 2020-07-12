import { AnyAction } from "redux";
import { loginSlice } from "smart/User/slice";
import { call, put, takeEvery } from "redux-saga/effects";

export const sagaActionTypes = {
  SAGA_LOGIN: "saga/user/login",
  SAGA_LOGOUT: "saga/user/logout",
};

export const sagaLoginAction = (username: string) => {
  return {
    type: sagaActionTypes.SAGA_LOGIN,
    payload: username,
  };
};

export async function fetchUser(username: string) {
  await new Promise((r) => setTimeout(r, 50));
  return {
    id: 5,
    username,
    first: username,
    last: "Lastname",
  };
}

export function* workerSagaLogin(action: AnyAction) {
  const user = yield call(fetchUser, action.payload);
  yield put(loginSlice.actions.login(user));
}

export function* watchSagaLogin() {
  yield takeEvery(sagaActionTypes.SAGA_LOGIN, workerSagaLogin);
}

export const sagaLogoutAction = () => {
  return {
    type: sagaActionTypes.SAGA_LOGOUT,
  };
};

export async function clearSession() {
  await new Promise((r) => setTimeout(r, 50));
}

export function* workerSagaLogout() {
  yield call(clearSession);
  yield put(loginSlice.actions.logout());
}

export function* watchSagaLogout() {
  yield takeEvery(sagaActionTypes.SAGA_LOGOUT, workerSagaLogout);
}
