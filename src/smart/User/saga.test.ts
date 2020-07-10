import {
  clearSession,
  fetchUser,
  sagaLoginAction,
  workerSagaLogin,
  workerSagaLogout,
} from "smart/User/saga";
import { loginSlice } from "smart/User/slice";
import { testSaga } from "redux-saga-test-plan";

describe("User saga", () => {
  it("Login", () => {
    testSaga(workerSagaLogin, sagaLoginAction("Bob"))
      .next()
      .call(fetchUser, "Bob")
      .next("Bob")
      .put(loginSlice.actions.login("Bob"))
      .next()
      .isDone();
  });
  it("Logout", () => {
    testSaga(workerSagaLogout)
      .next()
      .call(clearSession)
      .next(clearSession())
      .put(loginSlice.actions.logout())
      .next()
      .isDone();
  });
});
