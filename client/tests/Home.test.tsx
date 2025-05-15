import { test, expect } from "@playwright/test";

test("homepage ", async ({ page }) => {
  await page.goto("http://localhost:3001");
  await expect(page.getByText("Work in progress ⚒️⚒️⚒️")).toBeVisible();
});
