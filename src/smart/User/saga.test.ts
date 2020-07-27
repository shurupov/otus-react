import {
  clearSession,
  saveSession,
  sagaLoginAction,
  workerSagaLogin,
  workerSagaLogout,
  restoreSession,
  workerSagaRestoreSession,
} from "smart/User/saga";
import { loginSlice } from "smart/User/slice";
import { testSaga, expectSaga } from "redux-saga-test-plan";
import { reducer, StoreState } from "store/reducer";

const initialState: StoreState = {
  conwayField: [],
  user: {
    id: null,
    username: "",
    first: "",
    last: "",
  },
  conwaySettings: {
    fieldWidth: 20,
    fieldHeight: 20,
    cellSize: 10,
    animationDelay: 50,
    alivePercent: 30,
    animationStepsCount: 4,
  },
};

describe("User saga", () => {
  it("Restore saga unit test", () => {
    testSaga(workerSagaRestoreSession)
      .next()
      .call(restoreSession)
      .next({})
      .put(loginSlice.actions.login({}))
      .next()
      .isDone();
  });
  it("Restore saga integration test", () => {
    const bob = {
      id: 5,
      username: "Bob",
      first: "Bob",
      last: "Lastname",
    };
    localStorage.setItem("user", JSON.stringify(bob));
    const expectedFinalStoreState = {
      ...initialState,
      user: {
        ...bob,
      },
    };
    return expectSaga(workerSagaRestoreSession)
      .withReducer(reducer, { ...initialState })
      .hasFinalState(expectedFinalStoreState)
      .run();
  });
  it("Login saga unit test", () => {
    testSaga(workerSagaLogin, sagaLoginAction("Bob"))
      .next()
      .call(saveSession, "Bob")
      .next({})
      .put(loginSlice.actions.login({}))
      .next()
      .isDone();
  });
  it("Login saga integration test", () => {
    const expectedFinalStoreState = {
      ...initialState,
      user: {
        id: 5,
        username: "Bob",
        first: "Bob",
        last: "Lastname",
      },
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
      user: {
        id: null,
        username: "Tom Hanks",
        first: "Tom Hanks",
        last: "Lastname",
      },
    };
    return expectSaga(workerSagaLogout)
      .withReducer(reducer, { ...logoutInitialState })
      .hasFinalState(initialState)
      .run();
  });
});
