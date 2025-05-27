import { test, expect } from "@playwright/test";
import seq from "./seq";

test("goes to localhost:3001 home page", async ({ page }) => {
  await page.goto("http://localhost:3001");

  console.log(seq.models);

  await expect(page.locator("text=Work in progress ⚒️⚒️⚒️")).toBeVisible();
});
