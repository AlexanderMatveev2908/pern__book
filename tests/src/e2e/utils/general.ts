import { Page } from "@playwright/test";
import { account_0 } from "./data.js";
import { expect } from "@playwright/test";

export const handleLoginT = async ({ page }: { page: Page }) => {
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

export const makeNoticeTxt = (txt: string) =>
  `We've sent you an email ${txt}. If you don't see it, check your spam folder, it might be partying there 🎉`;

export const fillInput = async (page: Page, name: string, txt: string) =>
  await page.getByRole("textbox", { name }).fill(txt);

export const clickButton = async (page: Page, name: string) =>
  await page.getByRole("button", { name }).click();

export const clickLink = async (page: Page, name: string) =>
  await page.getByRole("link", { name }).click();

export const waitRedirect = async (page: Page, url: string) => {
  await page.waitForURL(url, { timeout: 10000 });
};
