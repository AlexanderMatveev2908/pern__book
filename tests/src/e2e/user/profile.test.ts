import { expect, test } from "@playwright/test";
import {
  clickBtn,
  fillInput,
  handleLoginT,
  nav,
  searchTxt,
} from "../utils/general.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("profile info", () => {
  test("✅", async ({ page }) => {
    nav(page, "user/profile-settings");

    await clickBtn({ page, aria: "edit firstName" });
    await clickBtn({ page, aria: "edit lastName" });

    await fillInput({ name: "firstName", page, txt: "John" });
    await fillInput({ name: "lastName", page, txt: "Doe" });

    await page
      .locator('input[type="file"]')
      .setInputFiles("src/assets/angry_bg.jpg");
    const fileName = await page
      .locator('input[type="file"]')
      .evaluate((input: HTMLInputElement) => {
        return input.files?.[0]?.name;
      });
    expect(fileName).toBe("angry_bg.jpg");

    await fillInput({
      page,
      name: "country",
      txt: '<script>console.log("hi ✌🏼")</script>',
    });
    await expect(
      page.getByRole("button", { name: "Save Changes" })
    ).toBeDisabled();
    await searchTxt({ page, txt: "Invalid country" });
    await fillInput({
      page,
      name: "country",
      txt: "United States",
    });

    await clickBtn({ page, aria: "next" });

    await searchTxt({ page, txt: "Street" });
  });

  // test("🚫", async ({ page }) => {});
});
