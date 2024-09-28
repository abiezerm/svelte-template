import { describe, expect, it } from "vitest";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/svelte";
import { navigate } from "svelte-routing";

import App from "./App.svelte";

describe("Routing", () => {

    //enhance this method to work with svelte-routing
    
    const setup = async (path: string) => {
        window.scrollTo = vi.fn()
        window.history.pushState({}, "", path);

        render(App);
        await navigate(path);
        
    }

    it.each`
        path                | pageTestId
        ${"/"}              | ${"home-page"}
        ${"/signup"}        | ${"signup-page"}
        ${"/login"}         | ${"login-page"}
        ${"/user/1"}        | ${"user-page"}
        ${"/user/2"}        | ${"user-page"}
        ${"/activate/123"}  | ${"activation-page"}
        ${"/activate/456"}  | ${"activation-page"}
    `("displays $pageTestId when path is $path", async ({ path, pageTestId }) => {
        await setup(path);

        const page = screen.queryByTestId(pageTestId);

        expect(page).toBeInTheDocument();
    });

    it.each`
        path                | pageTestId
        ${"/"}              | ${"signup-page"}
        ${"/"}              | ${"login-page"}
        ${"/"}              | ${"user-page"}
        ${"/"}              | ${"activation-page"}
        ${"/signup"}        | ${"home-page"}
        ${"/signup"}        | ${"login-page"}
        ${"/signup"}        | ${"user-page"}
        ${"/signup"}        | ${"activation-page"}
        ${"/login"}         | ${"home-page"}
        ${"/login"}         | ${"signup-page"}
        ${"/login"}         | ${"user-page"}
        ${"/login"}         | ${"activation-page"}
        ${"/user/1"}        | ${"home-page"}
        ${"/user/1"}        | ${"signup-page"}
        ${"/user/1"}        | ${"login-page"}
        ${"/user/1"}        | ${"activation-page"}
        ${"/activate/123"}  | ${"home-page"}
        ${"/activate/123"}  | ${"signup-page"}
        ${"/activate/123"}  | ${"login-page"}
        ${"/activate/123"}  | ${"user-page"}
    `("does not displays $pageTestId when path is $path", async ({ path, pageTestId }) => {
        await setup(path);

        const page = screen.queryByTestId(pageTestId);

        expect(page).not.toBeInTheDocument();
    });

    it.each`
    path           | queryName
   
    ${"/signup"}   | ${"Sign Up"}
    ${"/login"}    | ${"Login"}
    `("has a link to homepage in  Navbar", async ({path, queryName}) => {
        await setup("/");

        const homeLink = screen.queryByRole("link", { name: queryName });

        console.log(homeLink);

        expect(homeLink).toBeInTheDocument();
        expect(homeLink?.getAttribute("href")).toBe(path);

    });

    it.each`
    initialPath     | clickLink       | expectedPage       | expectedPath
    ${"/"}          | ${"Sign Up"}    | ${"signup-page"}   | ${"/signup"}
 
    ${"/"}          | ${"Login"}      | ${"login-page"}    | ${"/login"}
    `("display $expectedPage page when clicking on $clickLink link", async ({
        initialPath, clickLink, expectedPage, expectedPath}) => {
        setup(initialPath);

        const homeLink = screen.queryByRole("link", { name: clickLink });
        
        await fireEvent.click(homeLink!);
        screen.debug();

        const signupPage = screen.queryByTestId(expectedPage);

        expect(signupPage).toBeInTheDocument();
        expect(window.location.pathname).toBe(expectedPath);
    });

    it("display home page when clicking on brand logo", async () => {
        setup("/login");

        const brandLogo = screen.queryByAltText("Home");

        await fireEvent.click(brandLogo!);
        const page = screen.queryByTestId("home-page");

        expect(page).toBeInTheDocument();

    });

    it("navigates to user page when clicking the username on user list", async () => {
        setup("/");

        const user = await screen.findByText("user-in-list");

        await fireEvent.click(user!);
        
        expect(screen.queryByTestId("user-page")).toBeInTheDocument();

    });
});
