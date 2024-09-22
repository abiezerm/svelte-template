import { describe, expect, it } from "vitest";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/svelte";

import App from "./App.svelte";

describe("Routing", () => {

    //enhance this method to work with svelte-routing
    
    const setup = async (path: string) => {
        window.scrollTo = vi.fn()
        window.history.pushState({}, "", path);
        render(App);
        let link: HTMLElement | null = null;

        switch (path) {
            case "/":
                link = screen.queryByRole("link", { name: "Home" });
                break;
            case "/signup":
                link = screen.queryByRole("link", { name: "Sign Up" });
                break;
            case "/login":
                link = screen.queryByRole("link", { name: "Login" });
                break;
            case "/user/1":
                screen.getByText("User 1");
                break;
            case "/user/2":
                screen.getByText("User 2");
                break;
        }

        if(link)  await fireEvent.click(link!);

    }

    it.each`
        path            | pageTestId
        ${"/"}          | ${"home-page"}
        ${"/signup"}    | ${"signup-page"}
        ${"/login"}     | ${"login-page"}
    `("displays $pageTestId when path is $path", async ({ path, pageTestId }) => {
        await setup(path);

        const page = screen.queryByTestId(pageTestId);

        expect(page).toBeInTheDocument();
    });

    // it.each`
    // path            | pageTestId
    // ${"/"}          | ${"signup-page"}
    // ${"/"}          | ${"login-page"}
    // ${"/"}          | ${"user-page"}
    // ${"/signup"}    | ${"home-page"}
    // ${"/signup"}    | ${"login-page"}
    // ${"/signup"}    | ${"user-page"}
    // ${"/login"}    | ${"home-page"}
    // ${"/login"}    | ${"signup-page"}
    // ${"/login"}    | ${"user-page"}
    // `("does not displays $pageTestId when path is $path", async ({ path, pageTestId }) => {
    //     setup(path);

    //     const page = screen.queryByTestId(pageTestId);

    //     expect(page).not.toBeInTheDocument();
    // });

    // it.each`
    // path           | queryName
    // ${"/"}         | ${"Home"}
    // ${"/signup"}   | ${"Sign Up"}
    // ${"/login"}    | ${"Login"}
    // `("has a link to homepage in  Navbar", async ({path, queryName}) => {
    //     setup("/");

    //     const homeLink = screen.queryByRole("link", { name: queryName });

    //     console.log(homeLink);

    //     expect(homeLink).toBeInTheDocument();
    //     expect(homeLink?.getAttribute("href")).toBe(path);

    // });

    // it.each`
    // initialPath     | clickLink       | expectedPage       | expectedPath
    // ${"/"}          | ${"Sign Up"}    | ${"signup-page"}   | ${"/signup"}
    // ${"/signup"}    | ${"Home"}       | ${"home-page"}     | ${"/"}
    // ${"/"}          | ${"Login"}      | ${"login-page"}    | ${"/login"}
    // `("display $expectedPage page when clicking on $clickLink link", async ({
    //     initialPath, clickLink, expectedPage, expectedPath}) => {
    //     setup(initialPath);

    //     const homeLink = screen.queryByRole("link", { name: clickLink });

    //     await fireEvent.click(homeLink!);
    //     screen.debug();

    //     const signupPage = screen.queryByTestId(expectedPage);

    //     expect(signupPage).toBeInTheDocument();
    //     expect(window.location.pathname).toBe(expectedPath);
    // });

    it("display home page when clicking on brand logo", async () => {
        setup("/login");

        const brandLogo = screen.queryByAltText("Home");

        await fireEvent.click(brandLogo!);
        const page = screen.queryByTestId("home-page");

        expect(page).toBeInTheDocument();

    });
});
