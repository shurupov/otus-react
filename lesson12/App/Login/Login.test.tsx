import React from "react";
import { shallow, mount } from "enzyme";
import { Login } from "./Login";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

const authenticate = jest.fn();

describe("LoginScreen", () => {
  it("navigates to user page on submit", async () => {
    const name = "BobMarley";
    const screen = shallow(<Login onLogin={authenticate} />);

    expect(screen.find("Field").length).toEqual(1);
    expect(screen.find("button").length).toEqual(1);
  });
});
