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

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

// https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9
export function castPartialTo<T>(param: DeepPartial<T>): T {
  return (param as unknown) as T;
}

const initialState: StoreState = castPartialTo<StoreState>({
  user: {
    id: null,
    username: "",
    first: "",
    last: "",
  },
});

describe("User saga", () => {
  it("Login saga unit test", () => {
    testSaga(workerSagaLogin, sagaLoginAction("Bob"))
      .next()
      .call(fetchUser, "Bob")
      .next({})
      .put(loginSlice.actions.login({}))
      .next()
      .isDone();
  });
  it("Login saga integration test", () => {
    return expectSaga(workerSagaLogin, sagaLoginAction("Bob"))
      .withReducer(reducer, { ...initialState })
      .run()
      .then((result) => {
        const state: StoreState = result.storeState;
        expect(state.user).toEqual({
          id: 5,
          username: "Bob",
          first: "Bob",
          last: "Lastname",
        });
      });
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
      .run()
      .then((result) => {
        const state: StoreState = result.storeState;
        expect(state.user).toEqual(initialState.user);
      });
  });
});
