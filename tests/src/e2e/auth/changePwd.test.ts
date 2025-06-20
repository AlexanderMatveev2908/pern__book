import { expect, test } from "@playwright/test";
import { nav } from "../utils/general.js";
import { handleBeforeEach, handleGoPrivateAccountArea } from "./lib/utils.js";
import { account_0 } from "./lib/data.js";

test.beforeEach(async ({ page }) => {
  await handleBeforeEach({ page });
});

test.describe("handle change pwd", () => {
  test("should change pwd", async ({ page }) => {
    await nav(page, "user/manage-account");

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

    const hasOpacity = await page
      .locator("text=You should confirm your new password")
      .evaluate((el) => {
        let current = el as HTMLElement | null;

        while (current) {
          const style = getComputedStyle(current);
          if (style.opacity === "0") return true;
          current = current.parentElement;
        }

        return false;
      });

    expect(hasOpacity).toBe(true);
  });
});
