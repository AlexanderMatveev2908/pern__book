import { expect, test } from "@playwright/test";
import { account_1 } from "../../lib/data.js";
import { handleLoginT } from "../../lib/login.js";
import { handleGoPrivateAccountArea } from "./lib/utils.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("handle manage account", () => {
  test("should manage account", async ({ page }) => {
    await handleGoPrivateAccountArea({ page });

    await page.getByRole("textbox", { name: "email" }).fill(account_1.email);
    await page.getByRole("button", { name: "Update Email" }).click();

    await expect(
      page.getByText("email almost updated".toUpperCase())
    ).toBeVisible();
    // await page
    //   .getByRole("textbox", { name: "password" })
    //   .fill(account_0.pwd + "banana");
    // await page.getByRole("button", { name: "confirm" }).click();
    // await expect(page.getByText("invalid credentials")).toBeVisible();
  });
});
