import {
  clearSession,
  fetchUser,
  sagaLoginAction,
  workerSagaLogin,
  workerSagaLogout,
} from "smart/User/saga";
import { loginSlice } from "smart/User/slice";
import { testSaga, expectSaga } from "redux-saga-test-plan";
import { reducer, StoreState } from "store/reducer";

const initialState: StoreState = {
  user: {
    username: "",
  },
  conway: {
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

describe("User saga", () => {
  it("Login saga unit test", () => {
    testSaga(workerSagaLogin, sagaLoginAction("Bob"))
      .next()
      .call(fetchUser, "Bob")
      .next("Bob")
      .put(loginSlice.actions.login("Bob"))
      .next()
      .isDone();
  });
  it("Login saga integration test", () => {
    const expectedFinalStoreState = {
      ...initialState,
      user: { username: "Bob" },
    };
    return expectSaga(workerSagaLogin, sagaLoginAction("Bob"))
      .withReducer(reducer, { ...initialState })
      .hasFinalState(expectedFinalStoreState)
      .run();
  });
  it("Logout saga unit test", () => {
    testSaga(workerSagaLogout)
      .next()
      .call(clearSession)
      .next(clearSession())
      .put(loginSlice.actions.logout())
      .next()
      .isDone();
  });
  it("Logout saga integration test", () => {
    const logoutInitialState = {
      ...initialState,
      user: { username: "Tom Hanks" },
    };
    return expectSaga(workerSagaLogout)
      .withReducer(reducer, { ...logoutInitialState })
      .hasFinalState(initialState)
      .run();
  });
});
