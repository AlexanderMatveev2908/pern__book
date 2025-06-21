import { expect, test } from "@playwright/test";
import { handleLoginT, nav } from "../utils/general.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("profile info", () => {
  test("✅", async ({ page }) => {
    nav(page, "user/profile-settings");

    await expect(
      page.locator('input[placeholder="Your First Name..."]')
    ).toHaveValue("Alex");
    await expect(
      page.locator('input[placeholder="Your Last Name..."]')
    ).toHaveValue("Matveev");

    await page
      .locator('input[type="file"]')
      .setInputFiles("src/assets/angry_bg.jpg");

    const fileName = await page
      .locator('input[type="file"]')
      .evaluate((input: HTMLInputElement) => {
        return input.files?.[0]?.name;
      });
    expect(fileName).toBe("angry_bg.jpg");

    await page
      .getByLabel("country")
      .fill('<script>console.log("hi ✌🏼")</script>');
    await expect(
      page.getByRole("button", { name: "Save Changes" })
    ).toBeDisabled();
  });

  test("❌", async ({ page }) => {});
});
