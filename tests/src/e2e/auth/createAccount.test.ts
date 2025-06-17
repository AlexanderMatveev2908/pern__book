import seq from "../../db/config.js";
import { expect, test } from "@playwright/test";
import { nav } from "../utils/general.js";
import { makeNoticeTxt } from "../../lib/utils.js";
import { account_0 } from "./data.js";

test.beforeAll(async () => {
  await seq.authenticate();

  // await clear();
});
test.afterAll(async () => {
  // await clear();
});

test.describe("handle new user", () => {
  test("should register", async ({ page }) => {
    await nav(page, "auth/register");
    await page
      .getByRole("textbox", { name: "First Name" })
      .fill(account_0.firstName);
    await page
      .getByRole("textbox", { name: "Last Name" })
      .fill(account_0.lastName);
    await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
    await page.getByRole("button", { name: "next" }).click();
    await page.waitForSelector("text=Password", { state: "visible" });
    await expect(page.getByText("Password", { exact: true })).toBeVisible();
    await page.waitForSelector("text=Generate password", { state: "visible" });
    await expect(page.getByText("Generate password")).toBeVisible();
    await page.getByRole("button", { name: "Generate password" }).click();
    await page.locator("button > div > .txt__2").waitFor({ state: "visible" });
    await expect(page.locator("button > div > .txt__2")).toHaveText(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{16}$/
    );
    await page.getByRole("button", { name: "copy to clipboard" }).click();
    await expect(page.getByText("Copied to clipboard")).toBeVisible();
    const pwd = await page.locator("button > div > .txt__2").textContent();
    await page.getByLabel("Password", { exact: true }).fill(pwd ?? "");
    await page
      .getByRole("textbox", { name: "Confirm Password" })
      .fill(pwd ?? "");
    await page
      .getByRole("checkbox", { name: "accept terms and conditions" })
      .click();
    await expect(
      page.getByRole("checkbox", { name: "accept terms and conditions" })
    ).toHaveClass(/checky/);
    await expect(
      page.getByRole("checkbox", { name: "accept terms and conditions" })
    ).toHaveAttribute("aria-checked", "true");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByRole("button", { name: "Register" })).toBeHidden();
    await page.waitForURL("**/notice");
    await expect(page.getByText("Account created".toUpperCase())).toBeVisible();
    await expect(
      page.getByText(makeNoticeTxt("to verify your account"))
    ).toBeVisible();
  });
});
