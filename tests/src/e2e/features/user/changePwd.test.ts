import { expect, test } from "@playwright/test";
import { listenErr } from "../../lib/general.js";
import { account_0 } from "../../lib/data.js";
import { handleLoginT } from "../../lib/login.js";
import { handleGoPrivateAccountArea } from "./lib/utils.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("handle change pwd", () => {
  test("should change pwd", async ({ page }) => {
    await handleGoPrivateAccountArea({ page });

    await page.getByRole("button", { name: "next" }).first().click();
    await expect(page.getByText("RESET PASSWORD")).toBeVisible();

    let success: boolean = false;

    try {
      for (const pwd of [account_0.pwd, account_0.newPwd]) {
        await page.getByLabel("New Password", { exact: true }).fill(pwd);

        await expect(
          page.getByText("You should confirm your new password")
        ).toBeVisible();
        await page.waitForSelector("text=Confirm New Password", {
          state: "visible",
        });
        await page
          .getByPlaceholder("Confirm Your New Password...", { exact: true })
          .fill(pwd);

        await listenErr({ page, testID: "confirmPassword" });

        await page.getByRole("button", { name: "Update password" }).click();
        await expect(page.getByText("PASSWORD SAVED")).toBeVisible();

        success = true;
        break;
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  });
});
