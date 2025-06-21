import { expect, test } from "@playwright/test";
import { handleLoginT } from "../../lib/login.js";
import {
  clickBtn,
  clickLink,
  fillInput,
  listenErr,
  searchTxt,
  waitRedirect,
} from "../../lib/play.js";
import { doLorem } from "../../lib/utils.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("", () => {
  test("✅", async ({ page }) => {
    await clickBtn({ page, aria: "toggle sidebar" });
    await searchTxt({ page, txt: "Admin area" });
    await searchTxt({ page, txt: "My Account" });

    await clickBtn({ page, aria: "Admin area dropdown" });
    await searchTxt({ page, txt: "Open a bookstore" });

    await clickLink({ page, aria: "Open a bookstore sidebar" });
    await waitRedirect(page, `owner/book-store/create`);

    await searchTxt({ page, txt: "🟢 Fields marked in green are required" });

    await fillInput({
      page,
      name: "name",
      txt: "Alex ` bookstore",
    });

    await expect(page.locator('textarea[name="description"]')).toBeVisible();
    await page.locator('textarea[name="description"]').fill(doLorem(10));

    await page
      .locator('input[data-testid="video"]')
      .setInputFiles("src/assets/stores/videos/0.mp4");
    const fileName = await page
      .locator('input[data-testid="video"]')
      .evaluate((input: HTMLInputElement) => {
        return input.files?.[0]?.name;
      });
    expect(fileName).toBe("0.mp4");

    await page
      .locator('input[type="file"][data-testid="images-input"]')
      .setInputFiles(
        Array.from(
          {
            length: 6,
          },
          (_, i) => `src/assets/stores/imgs/${i}.jpeg`
        )
      );

    await searchTxt({
      page,
      txt: "For practical reason max length images is 5",
    });

    await await page
      .locator('input[type="file"][data-testid="images-input"]')
      .setInputFiles(
        Array.from(
          {
            length: 5,
          },
          (_, i) => `src/assets/stores/imgs/${i}.jpeg`
        )
      );

    await listenErr({ page, testID: "images" });

    const cat: string[] = ["Literature & Fiction", "Philosophy"];
    await clickBtn({
      page,
      aria: cat[0] + " button",
    });
    await clickBtn({ page, aria: "next cat" });
    await clickBtn({
      page,
      aria: cat[1] + " button",
    });

    for (const c of cat) {
      const btn = page.locator(`button[aria-label="${c} button"]`);
      await expect(btn).toHaveAttribute(
        "class",
        expect.stringContaining("border-blue-600 text-blue-600")
      );
    }
  });

  //   test("🚫", async ({ page }) => {});
});
