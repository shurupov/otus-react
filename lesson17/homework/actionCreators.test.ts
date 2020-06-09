import {
  loadingAction,
  updatePersonAction,
  updatePersonErrorAction,
} from "./actionCreators";

describe("action creators", () => {
  it("loading action", () => {
    expect(loadingAction()).toEqual({ type: "LOADING" });
  });

  it("update person", () => {
    expect(updatePersonAction({ name: "Evgeny" })).toEqual({
      type: "UPDATE_PERSON",
      payload: {
        name: "Evgeny",
      },
    });
  });

  it("update person error", () => {
    expect(updatePersonErrorAction(new Error("Error"))).toEqual({
      type: "UPDATE_PERSON_ERROR",
      payload: new Error("Error"),
    });
  });
});
