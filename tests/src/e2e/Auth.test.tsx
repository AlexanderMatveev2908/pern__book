import seq from "../db/config.js";
import { expect, test } from "@playwright/test";
import { bindModels } from "../db/models/all/bind/bind.js";
import { nav } from "./utils/general.js";

const account_0 = {
  email: "matveevalexander470@gmail.com",
  pwd: "o2zxih^Wl*W~8^da",
};
const account_1 = {
  email: "matveev.alexander.29.08.00@gmail.com",
  pwd: "iME*Ge%7y@@,x0oi",
};
const account_2 = {
  email: "matveevalexander2908@gmail.com",
  pwd: "f760Im}CZ_7YG?(.",
};

test.beforeAll(async () => {
  await seq.authenticate();
  bindModels(seq);
});

test.describe("auth 🔒", () => {
  test("should not login", async ({ page }) => {
    await nav(page, "auth/login");

    await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
    await page.getByLabel("password").fill(account_0.pwd);
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("user not found")).toBeVisible();
  });
});
