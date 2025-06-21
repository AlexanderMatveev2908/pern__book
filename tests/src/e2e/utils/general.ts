import { Page } from "@playwright/test";
import { account_0 } from "./data.js";
import { expect } from "@playwright/test";

export const handleLoginPreTest = async ({ page }: { page: Page }) => {
  await nav(page, "auth/login");

  await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  await page.getByLabel("password").fill(account_0.pwd);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("login successful".toUpperCase())).toBeVisible();
};

const B_URL = "https://localhost";

export const nav = async (page: Page, p: string) => {
  await page.goto(`${B_URL}/${p}`);
};
