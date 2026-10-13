import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import ErrorPage from "./error";

afterEach(() => vi.restoreAllMocks());

test("error fallback focuses its heading and retries on request", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const retry = vi.fn();

  render(<ErrorPage error={new Error("test failure")} retry={retry} />);

  expect(screen.getByRole("heading", { name: "Something went wrong." })).toHaveFocus();
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(retry).toHaveBeenCalledOnce();
  expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
});
