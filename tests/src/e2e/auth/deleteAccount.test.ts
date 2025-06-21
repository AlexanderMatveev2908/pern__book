import { expect, test } from "@playwright/test";
import { handleGoPrivateAccountArea } from "./lib/utils.js";
import { handleLoginT } from "../utils/general.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("handle delete account", () => {
  test("should delete account", async ({ page }) => {
    await handleGoPrivateAccountArea({ page });

    await page.getByRole("button", { name: "next" }).click();
    await page.waitForSelector("text=RESET PASSWORD", { state: "visible" });
    await expect(page.getByText("RESET PASSWORD")).toBeVisible();
    await page.getByRole("button", { name: "next" }).click();
    await page.waitForSelector("text=DELETE ACCOUNT", { state: "visible" });
    await expect(page.locator('h1:has-text("DELETE ACCOUNT")')).toBeVisible();

    await page
      .getByRole("button", { exact: true, name: "Delete account" })
      .click();
    await page.waitForSelector(
      "text=Are you sure about deleting your account ?",
      { state: "visible" }
    );
    await expect(
      page.getByText("Are you sure about deleting your account ?")
    ).toBeVisible();

    await page.getByTestId("delete-account").waitFor({ state: "visible" });
    await page.getByTestId("delete-account").click();

    await page.waitForURL("**/notice", { waitUntil: "networkidle" });
    await expect(
      page.getByText("Your account has successfully deleted")
    ).toBeVisible();
  });
});
