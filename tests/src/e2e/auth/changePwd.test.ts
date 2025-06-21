import { expect, test } from "@playwright/test";
import { handleLoginT, listenErr, nav } from "../utils/general.js";
import { handleGoPrivateAccountArea } from "./lib/utils.js";
import { account_0 } from "../utils/data.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("handle change pwd", () => {
  test("should change pwd", async ({ page }) => {
    await handleGoPrivateAccountArea({ page });

    await page.getByRole("button", { name: "next" }).first().click();
    await page.waitForSelector("text=RESET PASSWORD", { state: "visible" });
    await expect(page.getByText("RESET PASSWORD")).toBeVisible();

    await page.getByLabel("New Password", { exact: true }).fill(account_0.pwd);
    await page.waitForSelector("text=You should confirm your new password", {
      state: "visible",
    });
    await expect(
      page.getByText("You should confirm your new password")
    ).toBeVisible();
    await page.waitForSelector("text=Confirm New Password", {
      state: "visible",
    });
    await page
      .getByPlaceholder("Confirm Your New Password...", { exact: true })
      .fill(account_0.pwd);

    await listenErr({ page, testID: "confirmPassword" });

    // await page.getByRole("button", { name: "Update password" }).click();
    // await expect(page.getByText("PASSWORD SAVED")).toBeVisible();
  });
});
