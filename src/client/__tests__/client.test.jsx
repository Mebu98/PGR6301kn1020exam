import * as React from "react";
import {Login} from "../pages/login/login";
import {act} from "react-dom/test-utils";
import {createRoot} from "react-dom/client";
import {Register} from "../pages/login/register";

describe("client test suite", () => {
    it("there exists a Login page", () => {
        const element = document.createElement("div");

        const root = createRoot(element);
        act( () => root.render(
            <Login />
        ));

        expect(element.querySelector("h1")?.innerHTML).toEqual(" Welcome to login ");
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("there exists a Register page", () => {
        const element = document.createElement("div");

        const root = createRoot(element);
        act( () => root.render(
            <Register />
        ));

        expect(element.querySelector("h1")?.innerHTML).toEqual(" Welcome to register ");
        expect(element.innerHTML).toMatchSnapshot();
    });
});