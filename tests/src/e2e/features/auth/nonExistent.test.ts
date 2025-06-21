import { test, expect } from "@playwright/test";
import { nav } from "../../lib/play.js";
import { account_1 } from "../../lib/data.js";

test.describe("handle non existent user", () => {
  test("should not login", async ({ page }) => {
    await nav(page, "auth/login");

    await page.getByRole("textbox", { name: "email" }).fill(account_1.email);
    await page.getByLabel("password").fill(account_1.pwd);
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("user not found")).toBeVisible();
  });
  test("should not recover account", async ({ page }) => {
    await nav(page, "auth/forgot-pwd");
    await page.getByRole("textbox", { name: "email" }).fill(account_1.email);
    await page.getByRole("button", { name: "Send Email" }).click();
    await expect(page.getByText("user not found")).toBeVisible();
  });
  test("should not send another email", async ({ page }) => {
    await nav(page, "auth/verify-account");
    await page.getByRole("textbox", { name: "email" }).fill(account_1.email);
    await page.getByRole("button", { name: "Send Email" }).click();
    await expect(page.getByText("user not found")).toBeVisible();
  });
});
