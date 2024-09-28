import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import UserList from "./UserList.svelte";
import { render, screen, waitFor } from "@testing-library/svelte";
import auth from "../../api/apiCalls.svelte";

const page1 = {
  content: [
    {
      id: 1,
      username: "user1",
      email: "user1@mail.com",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@mail.com",
    },
    {
      id: 3,
      username: "user3",
      email: "user3@mail.com",
    },
  ],
  page: 0,
  size: 3,
  totalPages: 9,
};

describe("User List", () => {

  it("displays 3 users in the list", async () => {
    const mockLoadUsers = vi.fn().mockReturnValue({
      data: page1,
    });
    //auth.loadUsers = mockLoadUsers;

    vi.spyOn(auth, "loadUsers").mockImplementation(mockLoadUsers);

    render(UserList);

    waitFor(() => {
      screen.debug();
      const users = screen.queryAllByText(/user/);

      expect(users.length).toBe(3);
    });
  });

  // it("displays next page link", async () => {


  //   render(UserList);

  //   const nextPageButton = screen.queryByText("next >");

  //   expect(nextPageButton).toBeInTheDocument();

  // });

  // it("displays next page after clicking next", async () => {
  //   // const mockLoadUsers = vi.fn().mockReturnValue({
  //   //   data: page1,
  //   // });
  //   // //auth.loadUsers = mockLoadUsers;

  //   // vi.spyOn(auth, "loadUsers").mockImplementation(mockLoadUsers);

  //   render(UserList);
    
  //   const nextPageButton = screen.queryByText("next >");

  //   expect(nextPageButton).toBeInTheDocument();

  // });

  it("displays spinner while loading", async () => {
    const mockLoadUsers = vi.fn().mockReturnValue(new Promise(() => {}));
    //auth.loadUsers = mockLoadUsers;

    vi.spyOn(auth, "loadUsers").mockImplementation(mockLoadUsers);

    render(UserList);

    const spinner = screen.queryByRole("status");

    expect(spinner).toBeInTheDocument();
  });

  it("hides spinner when api call is completed", async () => {
    const mockLoadUsers = vi.fn().mockReturnValue({
      data: page1,
    });
    //auth.loadUsers = mockLoadUsers;

    vi.spyOn(auth, "loadUsers").mockImplementation(mockLoadUsers);

    render(UserList);

    waitFor(() => {
      const spinner = screen.queryByRole("status");

      expect(spinner).not.toBeInTheDocument();
    });
  });

});
