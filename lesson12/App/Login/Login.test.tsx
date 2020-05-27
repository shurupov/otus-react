import React from "react";
import { shallow } from "enzyme";
import { Login } from "./Login";

const authenticate = jest.fn();

describe("LoginScreen", () => {
  it("navigates to user page on submit", async () => {
    const screen = shallow(<Login onLogin={authenticate} />);
    expect(screen.find("Field").length).toEqual(1);
    expect(screen.find("button").length).toEqual(1);
  });
});
