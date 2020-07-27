import { AnyAction } from "redux";
import { loginSlice, UserStore } from "smart/User/slice";
import { call, put, takeEvery } from "redux-saga/effects";
import { reinitAction } from "smart/ConwayLife/saga";

const userSagaActionTypes = {
  RESTORE: "saga/user/restore",
  LOGIN: "saga/user/login",
  LOGOUT: "saga/user/logout",
};

export const sagaLoginAction = (username: string) => {
  return {
    type: userSagaActionTypes.LOGIN,
    payload: username,
  };
};

export async function saveSession(username: string) {
  const user: UserStore = {
    id: 5,
    username,
    first: username,
    last: "Lastname",
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function* workerSagaLogin(action: AnyAction) {
  const user = yield call(saveSession, action.payload);
  yield put(loginSlice.actions.login(user));
  yield put(reinitAction());
}

export function* watchSagaLogin() {
  yield takeEvery(userSagaActionTypes.LOGIN, workerSagaLogin);
}

export const sagaLogoutAction = () => {
  return {
    type: userSagaActionTypes.LOGOUT,
  };
};

export async function clearSession() {
  localStorage.removeItem("user");
}

export function* workerSagaLogout() {
  yield call(clearSession);
  yield put(loginSlice.actions.logout());
}

export function* watchSagaLogout() {
  yield takeEvery(userSagaActionTypes.LOGOUT, workerSagaLogout);
}

export const sagaRestoreSessionAction = () => {
  return {
    type: userSagaActionTypes.RESTORE,
  };
};

export async function restoreSession() {
  const userString = localStorage.getItem("user");
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
}

export function* workerSagaRestoreSession() {
  const user = yield call(restoreSession);
  if (user) {
    yield put(loginSlice.actions.login(user));
  }
}

export function* watchSagaRestoreSession() {
  yield takeEvery(userSagaActionTypes.RESTORE, workerSagaRestoreSession);
}
