import { createStore, Store } from "redux";
import { getPersonByIdFunction } from "./getPersonByIdFunction";
import { reducer } from "./reducer";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const store: Store = createStore(reducer);
const getPersonById = getPersonByIdFunction(store);

describe("getPersonById", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("update success", async () => {
    fetchMock.mockResponseOnce(async () => {
      await new Promise((r) => setTimeout(r, 100));
      return JSON.stringify({ name: "Evgeny" });
    });

    getPersonById(5);
    expect(store.getState()).toEqual({
      loading: true,
      error: false,
      errorMessage: "",
      person: null,
    });
    await new Promise((r) => setTimeout(r, 200));

    expect(store.getState()).toEqual({
      person: {
        name: "Evgeny",
      },
      loading: false,
      error: false,
      errorMessage: "",
    });
  });

  it("update error", async () => {
    fetchMock.mockRejectOnce(Error("Error message"));

    getPersonById(5);
    expect(store.getState()).toEqual({
      loading: true,
      error: false,
      errorMessage: "",
      person: null,
    });
    await new Promise((r) => setTimeout(r, 200));

    expect(store.getState()).toEqual({
      loading: false,
      error: true,
      errorMessage: "Error message",
      person: null,
    });
  });
});
