import { test, expect } from "@playwright/test";
import { nav } from "../utils/general.js";
import { account_0 } from "../utils/data.js";
import { handlePwdSwing } from "../utils/login.js";

test.describe("handle login user", () => {
  test("should not login ", async ({ page }) => {
    await nav(page, "auth/login");

    await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
    await page
      .getByLabel("password")
      .fill(account_0.pwd + "monkeysLoveBananas");

    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByText("invalid credentials".toUpperCase())
    ).toBeVisible();
  });

  test("should login", async ({ page }) => {
    await nav(page, "auth/login");

    await page.getByRole("textbox", { name: "email" }).fill(account_0.email);

    const success = await handlePwdSwing({
      page,
      aria: "login",
      txt: "LOGIN SUCCESSFUL",
    });

    expect(success).toBe(true);
  });
});
