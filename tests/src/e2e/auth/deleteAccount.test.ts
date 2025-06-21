import { expect, test } from "@playwright/test";
import { handleGoPrivateAccountArea } from "./lib/utils.js";
import { clickBtn, searchTxt } from "../utils/general.js";
import { handleLoginT } from "../utils/login.js";

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

    await clickBtn({ page, aria: "confirm delete account" });

    await page.waitForURL("**/notice", { waitUntil: "load" });
    await searchTxt({
      page,
      txt: "Your account has successfully deleted",
    });
  });
});
