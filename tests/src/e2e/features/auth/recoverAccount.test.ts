import { test, expect } from "@playwright/test";
import { nav } from "../../lib/play.js";
import { account_0 } from "../../lib/data.js";

test.describe("recover account", () => {
  test("should recover account", async ({ page }) => {
    await nav(page, "auth/forgot-pwd");

    await page.getByRole("textbox", { name: "email" }).fill(account_0.email);

    await page.getByRole("button", { name: "Send Email" }).click();
    await expect(
      page.getByText("email send successfully".toUpperCase().toUpperCase())
    ).toBeVisible();
  });
});
