import { test, expect } from "@playwright/test";

test("goes to localhost:3001 home page", async ({ page }) => {
  await page.goto("http://localhost:3001");

  await expect(page.locator("text=Work in progress ⚒️⚒️⚒️")).toBeVisible();
});
