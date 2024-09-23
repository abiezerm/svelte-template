import { describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/svelte";

import { activate } from "../api/apiCalls.svelte";
import AccountActivationPage from "./AccountActivationPage.svelte";

// Mock the activate function
vi.mock('../api/apiCalls.svelte', () => ({
    activate: vi.fn()
}));

describe("AccountActivationPage", () => {

    beforeEach(() => {
        vi.resetAllMocks();
        //vi.useFakeTimers();
    });

    // afterEach(() => {
    //     vi.useRealTimers();
    // });

    it("displays activation success message when token is correct", async () => {
        (activate as vi.Mock).mockResolvedValueOnce();

        render(AccountActivationPage, { token: "1234" });

        const successMessage = await screen.findByText("Account activated successfully");

        expect(successMessage).toBeInTheDocument();
    });

    it("sends activation request to backend", async () => {
        const mockActivate = (activate as vi.Mock).mockResolvedValueOnce();

        render(AccountActivationPage, { token: "1234" });

        //screen.getByText("Account activated successfully");

        expect(mockActivate).toHaveBeenCalledOnce();
    });

    it("displays activation error message when token is incorrect", async () => {
        (activate as vi.Mock).mockRejectedValueOnce();

        render(AccountActivationPage, { token: "1234" });

        const errorMessage = await screen.findByText("Activation failure");

        expect(errorMessage).toBeInTheDocument();
    });

    it("displays spinner while waiting for response", async () => {
        const { activate } = await import("../api/apiCalls.svelte");
        activate.mockReturnValue(new Promise(() => {}));

        render(AccountActivationPage);

        // Assert that the loading spinner is visible
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

});