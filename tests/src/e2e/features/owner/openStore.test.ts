import { expect, test } from "@playwright/test";
import { handleLoginT } from "../../lib/login.js";
import {
  clickBtn,
  clickLink,
  searchTxt,
  waitRedirect,
} from "../../lib/general.js";

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
  });

  //   test("🚫", async ({ page }) => {});
});
