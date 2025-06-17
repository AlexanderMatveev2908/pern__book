import { expect, test } from "@playwright/test";
import { nav } from "../utils/general.js";
import { account_0 } from "./data.js";

test.beforeEach(async ({ page }) => {
  await nav(page, "auth/login");

  await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  await page.getByLabel("password").fill(account_0.pwd);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("login successful".toUpperCase())).toBeVisible();
});

test.describe("handle manage account", () => {
  test("should manage account", async ({ page }) => {
    await page.getByRole("button", { name: "dropdown header" }).hover();

    await expect(page.getByText("Profile")).toBeVisible();
    await expect(page.getByText("Manage Account")).toBeVisible();
    await expect(page.getByText("Logout")).toBeVisible();

    // await expect(page.getByText("CONFIRM YOUR PASSWORD")).toBeVisible();

    // await page
    //   .getByRole("textbox", { name: "password" })
    //   .fill(account_0.pwd + "banana");
    // await page.getByRole("button", { name: "confirm" }).click();
    // await expect(page.getByText("invalid credentials")).toBeVisible();
  });
});
