import { expect, test } from "@playwright/test";
import { handleLoginT } from "../../lib/login.js";
import { clickBtn, clickLink, nav, searchTxt } from "../../lib/general.js";

test.beforeEach(async ({ page }) => {
  await handleLoginT({ page });
});

test.describe("", () => {
  test("✅", async ({ page }) => {
    await clickBtn({ page, aria: "toggle sidebar" });
    await searchTxt({ page, txt: "Admin area", timeout: 10000 });
    await searchTxt({ page, txt: "My Account", timeout: 10000 });

    await clickBtn({ page, aria: "Admin area dropdown", timeout: 10000 });
    await searchTxt({ page, txt: "Open a bookstore", timeout: 10000 });
  });

  //   test("🚫", async ({ page }) => {});
});
