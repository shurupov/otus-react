import {
  clearSession,
  fetchUser,
  sagaLoginAction,
  workerSagaLogin,
  workerSagaLogout,
} from "smart/User/saga";
import { call, put } from "redux-saga/effects";
import { loginSlice } from "smart/User/slice";

describe("User saga", () => {
  it("Login", () => {
    const loginSaga = workerSagaLogin(sagaLoginAction("Bob"));
    expect(loginSaga.next()).toEqual({
      value: call(fetchUser, "Bob"),
      done: false,
    });
    expect(loginSaga.next()).toEqual({
      value: put(loginSlice.actions.login("Bob")),
      done: false,
    });
    expect(loginSaga.next()).toEqual({ value: undefined, done: true });
  });
  it("Logout", () => {
    const logoutSaga = workerSagaLogout();
    expect(logoutSaga.next()).toEqual({
      value: call(clearSession),
      done: false,
    });
    expect(logoutSaga.next()).toEqual({
      value: put(loginSlice.actions.logout()),
      done: false,
    });
    expect(logoutSaga.next()).toEqual({ value: undefined, done: true });
  });
});
