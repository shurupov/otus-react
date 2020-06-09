import { Action, createStore, Store } from "redux";
import { reducer } from "./reducer";

describe("reducer unit tests", () => {
  it("LOADING", () => {
    const state = reducer({}, { type: "LOADING" });
    expect(state).toEqual({
      loading: true,
      error: false,
      errorMessage: "",
      person: null,
    });
  });
  it("UPDATE_PERSON", () => {
    const state = reducer(
      {},
      {
        type: "UPDATE_PERSON",
        payload: { name: "person test name" },
      }
    );
    expect(state).toEqual({
      loading: false,
      error: false,
      errorMessage: "",
      person: { name: "person test name" },
    });
  });
  it("UPDATE_PERSON_ERROR", () => {
    const state = reducer(
      {},
      {
        type: "UPDATE_PERSON_ERROR",
        payload: new Error("Error message"),
      }
    );
    expect(state).toEqual({
      loading: false,
      error: true,
      errorMessage: "Error message",
      person: null,
    });
  });
});

describe("reducer integration tests", () => {
  let store: Store<any, Action>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it("LOADING", () => {
    store.dispatch({ type: "LOADING" });
    expect(store.getState()).toEqual({
      loading: true,
      error: false,
      errorMessage: "",
      person: null,
    });
  });
  it("UPDATE_PERSON", () => {
    store.dispatch({
      type: "UPDATE_PERSON",
      payload: { name: "person test name" },
    });
    expect(store.getState()).toEqual({
      loading: false,
      error: false,
      errorMessage: "",
      person: { name: "person test name" },
    });
  });
  it("UPDATE_PERSON_ERROR", () => {
    store.dispatch({
      type: "UPDATE_PERSON_ERROR",
      payload: new Error("Error message"),
    });
    const { loading, error, errorMessage } = store.getState();
    expect(loading).toBe(false);
    expect(error).toBe(true);
    expect(errorMessage).toBe("Error message");
  });
});
