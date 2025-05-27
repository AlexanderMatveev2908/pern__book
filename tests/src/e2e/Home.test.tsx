import { test, expect } from "@playwright/test";
import seq from "../db/config.js";
import { bindModels } from "../db/models/all/bind/bind.js";
import { User } from "../db/models/all/User.js";

test.beforeAll(async () => {
  await seq.authenticate();
  bindModels(seq);
});

test("goes to localhost:3001 home page", async ({ page }) => {
  await page.goto("http://localhost:3001");

  const users = await User.findAll({ where: {} });
  console.log(users);

  await expect(page.locator("text=Work in progress ⚒️⚒️⚒️")).toBeVisible();
});
