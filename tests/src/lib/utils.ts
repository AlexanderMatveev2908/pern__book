import { Page } from "@playwright/test";

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
