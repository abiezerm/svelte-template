import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import "../locale/i18n";

import axios from "axios";
import SignUpPage from "./SignUpPage.svelte";
import en from "../locale/en.json";
import es from "../locale/es.json";
import LanguageSelector from "../lib/LanguageSelector.svelte";
import { reset } from "../locale/i18n";

describe("SignUpPage", () => {

    describe("Layout", () => { 
        it("has Sign Up header", () => {
            render(SignUpPage);
        
            const header = screen.getByRole("heading", { name: "Sign Up" });
    
            expect(header).toBeTruthy();
        });

        it("has username input", () => {
            render(SignUpPage);
        
            const input = screen.getAllByLabelText("Username");
    
            expect(input).toBeTruthy();
        });

        it("has email input", () => {
            render(SignUpPage);
        
            const input = screen.getByLabelText("Email");
    
            expect(input).toBeTruthy();
        });

        it("has password input", () => {
            render(SignUpPage);
        
            const input = screen.getByLabelText("Password");
    
            expect(input).toBeTruthy();
        });

        it("has password type for password input", () => {
            render(SignUpPage);
        
            const input: HTMLInputElement = screen.getByLabelText("Password");
    
            expect(input.type).toBe("password");
        });

        it("has password repeat input", () => {
            render(SignUpPage);
        
            const input = screen.getByLabelText("Password Repeat");
    
            expect(input).toBeTruthy();
        });

        it("has password type for password repeat input", () => {
            render(SignUpPage);
        
            const input: HTMLInputElement = screen.getByLabelText("Password Repeat");
    
            expect(input.type).toBe("password");
        });

        it("has Sign Up button", () => {
            render(SignUpPage);
        
            const button = screen.getByRole("button", { name: "Sign Up" });
    
            expect(button).toBeTruthy();
        });

        it("has Sign Up button disable initially", () => {
            render(SignUpPage);
        
            const button = screen.getByRole("button", { name: "Sign Up" });
    
            expect(button).toHaveProperty("disabled", true);
        });


    });

    describe("Interactions", () => {    

        let 
            button, 
            passwordInput: HTMLInputElement, 
            passwordRepeatInput: HTMLInputElement,
            userNameInput: HTMLInputElement;

        const setup = async () => {
            render(SignUpPage);
            userNameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            passwordInput = screen.getByLabelText("Password");
            passwordRepeatInput = screen.getByLabelText("Password Repeat");

            await fireEvent.input(userNameInput, { target: { value: "userTest1" } });
            await fireEvent.input(emailInput, { target: { value: "usertest1@test.com" } });
            await fireEvent.input(passwordInput, { target: { value: "123" } });
            await fireEvent.input(passwordRepeatInput, { target: { value: "123" } });
        }

        it("enables the button when all inputs are filled", async () => {
            render(SignUpPage);
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");

            await fireEvent.input(passwordInput, { target: { value: "123" } });
            await fireEvent.input(passwordRepeatInput, { target: { value: "123" } });

            const button = screen.getByRole("button", { name: "Sign Up" });
            expect(button).toHaveProperty("disabled", false);

        });

        it("sends username, email and password to the backend after clicking submit", async () => {
            await setup();
            const submitButton = screen.getByRole("button", { name: "Sign Up" });

            const mockPost = vi.fn();
            axios.post = mockPost;
            //const fetchSpy = vi.spyOn(globalThis, 'fetch');

            await fireEvent.click(submitButton);

            const requestBody = mockPost.mock.calls[0][1];
            expect(requestBody).toEqual({
                username: "userTest1",
                email: "usertest1@test.com",
                password: "123"
            });

        });

        it("button is disabled when is an ongoing api call", async () => {
            await setup();
            const submitButton = screen.getByRole("button", { name: "Sign Up" });

            const mockPost = vi.fn();
            axios.post = mockPost;

            await fireEvent.click(submitButton);

            expect(submitButton).toHaveProperty("disabled", true);
        });

        it("button do not display spinner when there are not api request in in progress", async () => {
            await setup();

            const spinner = screen.queryByRole("status");

            expect(spinner).toBeFalsy();
        });

        it("button display spinner when api request in in progress", async () => {
            await setup();
            const submitButton = screen.getByRole("button", { name: "Sign Up" });

            const mockPost = vi.fn();
            axios.post = mockPost;

            await fireEvent.click(submitButton);

            waitFor(() => {
                const spinner = screen.getByRole("status");
                expect(spinner).toBeTruthy();
            });

            //expect(spinner).toBeTruthy();
        });

        it("display success message after successfully sign up request", async () => {
            await setup();
            const submitButton = screen.getByRole("button", { name: "Sign Up" });

            const mockPost = vi.fn();
            axios.post = mockPost;

            await fireEvent.click(submitButton);

            waitFor(() => {
                const textMessage = screen.getByText("Please check your email to activate your account");
                expect(textMessage).toBeTruthy();
            });

        });

        it("does not display success message before successfully sign up request", async () => {
            await setup();
            // const submitButton = screen.getByRole("button", { name: "Sign Up" });

            // const mockPost = vi.fn();
            // axios.post = mockPost;

           // await fireEvent.click(submitButton);

            const textMessage = screen.queryByText("Please check your email to activate your account");
            expect(textMessage).toBeFalsy();
        });

        it("display validation message for username", async () => {
            await setup();
            const submitButton = screen.getByRole("button", { name: "Sign Up" });

            const mockPost = vi.fn();
            axios.post = mockPost.mockResolvedValue({ data: { 
                validationErrors: {
                    username: "Username cannot be null"
                },
                message: "Validation error" 
            } });

            await fireEvent.click(submitButton);

            waitFor(() => {
                const userNameValidationError = screen.getByText("Username cannot be null");
                expect(userNameValidationError).toBeTruthy();
            });
        
        });

        it("does not display validation message for username initially", async () => {
            await setup();
            
            const userNameValidationError = screen.queryByRole("alert");
            expect(userNameValidationError).toBeFalsy();
        });

        it("hides spinner after response received", async () => {
            await setup();
            const submitButton = screen.getByRole("button", { name: "Sign Up" });

            const mockPost = vi.fn();
            axios.post = mockPost.mockResolvedValue({ data: { 
                validationErrors: {
                    username: "Username cannot be null"
                },
                message: "Validation error" 
            } });

            await fireEvent.click(submitButton);

            waitFor(() => {
                const spinner = screen.queryByRole("status");
                expect(spinner).toBeFalsy();
            });
        
        });

        it("enables the button after response received", async () => {
            await setup();
            const submitButton = screen.getByRole("button", { name: "Sign Up" });

            const mockPost = vi.fn();
            axios.post = mockPost.mockResolvedValue({ data: { 
                validationErrors: {
                    username: "Username cannot be null"
                },
                message: "Validation error" 
            } });

            await fireEvent.click(submitButton);

            waitFor(() => {
                const userNameValidationError = screen.getByText("Username cannot be null");
                expect(submitButton).toHaveProperty("disabled", false);
            });
        
        });

        it("display mismatch message for password repeat", async () => {
            await setup();
            await fireEvent.input(passwordInput, { target: { value: "pass" } });
            await fireEvent.input(passwordRepeatInput, { target: { value: "otherpass" } });

            const validationError = screen.getByText("Password mismatch");

            expect(validationError).toBeTruthy();
        });

        it("does not display mismatch message for password repeat initially", async () => {
            render(SignUpPage);

            const validationError = screen.queryByText("Password mismatch");

            expect(validationError).toBeFalsy();
        });

        // it("clears validation errors after username field is updated", async () => {
        //     await setup();
        //     const submitButton = screen.getByRole("button", { name: "Sign Up" });

        //     const mockPost = vi.fn();
        //     axios.post = mockPost.mockResolvedValue({ data: { 
        //         validationErrors: {
        //             username: "Username cannot be null"
        //         },
        //         message: "Validation error" 
        //     } });

        //     await fireEvent.click(submitButton);

        //     const userNameValidationError = await screen.findByText("Username cannot be null");

        //     await fireEvent.input(userNameInput, { target: { value: "userTest1" } })

        //     expect(userNameValidationError).toBeFalsy();
        // });
    });

    describe("Internationalization", () => {

        let englishToggleButton: HTMLButtonElement;
        let spanishToggleButton: HTMLButtonElement;

        const setup = () => {
            render(SignUpPage);
            render(LanguageSelector);
            englishToggleButton = screen.getByTestId("btn-en-lang");
            spanishToggleButton = screen.getByTestId("btn-es-lang");
        };

        beforeEach(() => {
            reset();
        });

        it("initially displays all texts in English", () => {
            setup();
            
            const header = screen.getByRole("heading", { name: en.signUp });
            const userNameInput = screen.getByLabelText(en.username);
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText(en.password);
            const passwordRepeatInput = screen.getByLabelText(en.passwordRepeat);
            const button = screen.getByRole("button", { name: en.signUp });

            expect(header).toBeTruthy();
            expect(userNameInput).toBeTruthy();
            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(passwordRepeatInput).toBeTruthy();
            expect(button).toBeTruthy();
        });

        it("displays all texts in Spanish after toggling the language", async() => {
            setup();

            await fireEvent.click(spanishToggleButton);

            const header = screen.getByRole("heading", { name: es.signUp });
            const userNameInput = screen.getByLabelText(es.username);
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText(es.password);
            const passwordRepeatInput = screen.getByLabelText(es.passwordRepeat);
            const button = screen.getByRole("button", { name: es.signUp });

            expect(header).toBeTruthy();
            expect(userNameInput).toBeTruthy();
            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(passwordRepeatInput).toBeTruthy();
            expect(button).toBeTruthy();
        });

        it("displays all texts in English after toggling the language", async() => {
            setup();

            await fireEvent.click(spanishToggleButton);
            await fireEvent.click(englishToggleButton);

            const header = screen.getByRole("heading", { name: en.signUp });
            const userNameInput = screen.getByLabelText(en.username);
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText(en.password);
            const passwordRepeatInput = screen.getByLabelText(en.passwordRepeat);
            const button = screen.getByRole("button", { name: en.signUp });

            expect(header).toBeTruthy();
            expect(userNameInput).toBeTruthy();
            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(passwordRepeatInput).toBeTruthy();
            expect(button).toBeTruthy();
        });

        it("display mismatch password validation in Spanish", async () => {
            setup();
            await fireEvent.click(spanishToggleButton);

            const passwordInput = screen.getByLabelText(es.password);

            await fireEvent.input(passwordInput, { target: { value: "pass" } });

            const validationError = screen.queryByText(es.passwordMismatchValidation);

            expect(validationError).toBeTruthy();

        });

    });

});