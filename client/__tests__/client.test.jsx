import * as React from "react";
import { Login } from "../pages/login/login";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { Register } from "../pages/login/register";
import { ManagerPage } from "../pages/manager/managerPage";

describe("client test suite", () => {
  it("there exists a Login page", () => {
    const element = document.createElement("div");

    const root = createRoot(element);
    act(() => root.render(<Login />));

    expect(element.querySelector("h1")?.innerHTML).toEqual(
      " Welcome to login "
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("there exists a Register page", () => {
    const element = document.createElement("div");

    const root = createRoot(element);
    act(() => root.render(<Register />));

    expect(element.querySelector("h1")?.innerHTML).toEqual(
      " Welcome to register "
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  /*
        // TODO: Fix this test
        // Fails because useLocation is used in ManagerPage to transfer user data
        it("there exists a Manager page", () => {
            const element = document.createElement("div");

            const root = createRoot(element);
            act( () => root.render(
                <ManagerPage />
            ));

            expect(element.querySelector("h1")?.innerHTML).toEqual("Welcome to manager section");
            expect(element.innerHTML).toMatchSnapshot();
        });
     */
});
